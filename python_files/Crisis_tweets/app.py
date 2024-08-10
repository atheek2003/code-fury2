# from tensorflow.keras.models import model_from_json

#### model.h5 is not there for limited space please generate your own weights or run ipynb file
import re
import string
import tensorflow as tf
from tensorflow_hub import KerasLayer
import tensorflow_text
import json
from http import client
import json
from pymongo import MongoClient
import tweepy
from tweepy.asynchronous import AsyncStreamingClient
import time
import pandas as pd
import numpy as np
import os
from dotenv import load_dotenv
import asyncio
# import preprocessor as p
# import demoji

load_dotenv()
consumer_key=os.getenv('API_Key')
consumer_secret=os.getenv('API_Key_Secret')

access_token=os.getenv('access_token')

access_token_secret=os.getenv('access_token_secret')

auth = tweepy.OAuth1UserHandler(consumer_key, consumer_secret)   
auth.set_access_token(access_token,access_token_secret)
api=tweepy.API(auth,retry_count=2)
bearer_token = os.environ["bearer_token"]
printable = set(string.printable)
# app = FastAPI()

class MyStreamer(AsyncStreamingClient):
    def __init__(self, tlimit: int):
        self.start_time = time.time()
        self.limit = int(tlimit)
        self.data = []
        super(MyStreamer, self).__init__(bearer_token,wait_on_rate_limit=True)
        print(" just checking ")

    async def on_tweet(self, tweet):
        if (time.time() - self.start_time) < self.limit:
            print(" --- streaming tweets --- ")
            id =tweet.id
            text = "@Notweet"
            status = api.get_status(id, tweet_mode="extended")
            try:
                text =status.retweeted_status.full_text
            except AttributeError:  
                text = status.full_text
            except tweepy.TweepError as e:
                pass   
            except Exception as ee:
                pass       
            self.data.append({ 'text':text ,'id':id})
            print(" tweet text is  "+ text)
        else:
            print("----------- going to sleep ----------")
            await self._sleep_and_preprocess()
            self.start_time =time.time()
            self.data = []
            print(" Reconnecting with the stream ")

    async def _sleep_and_preprocess(self):
        await asyncio.sleep(30)
        df = self._preprocess_data()
        if df.empty is False :
            data= self.predict(df)
            self.insert_into_db(data)
    # def clean_text(text):
    #     text= re.sub(r'@[A-Za-z0-9]+', '', str(text)) # remove @mentions
    #     text = re.sub(r'#', '',  str(text)) # remove the '#' symbol
    #     text = re.sub(r'RT[\s]+', '',  str(text)) # remove RT
    #     text = re.sub(r'https?\/\/S+', '', str(text)) # remove the hyperlink
    #     text = re.sub(r'http\S+', '', str(text)) # remove the hyperlink
    #     text = re.sub(r'www\S+', '', str(text)) # remove the www
    #     text = re.sub(r'twitter+', '', str(text)) # remove the twitter
    #     text = re.sub(r'pic+', '', str(text)) # remove the pic
    #     text = re.sub(r'com', '', str(text)) # remove the com
    #     text = ''.join(filter(lambda x: x in printable, text))
    #     text = p.clean(text)
    #     return text
    def _preprocess_data(self):
        df = pd.DataFrame(self.data)
        if df.empty :
            print(" Dataframe is empty ")
            return df
        df.loc[:, "text"] = df["text"].str.replace(r"@\S+","", regex=True)
        df.loc[:, "text"] = df["text"].str.replace(r"http\S+", "", regex=True)
        df.loc[:, "text"] = df["text"].str.replace(r"RT", "")
        df.loc[:, "text"] = df["text"].str.replace(r"&amp;", "&")
        return df

    def predict(self, df):
        # call your model here to predict on the dataframe
        # return predictions
        with open('model.json', 'r') as json_file: # give right directory
            model_json = json_file.read()
        custom_objects = {"KerasLayer": KerasLayer}
        model = tf.keras.models.model_from_json(model_json, custom_objects=custom_objects)
        model.load_weights('model.h5') # give right directory
        test=df
        test =test.drop(["id"],axis=1)
        test_tensor = tf.convert_to_tensor(test)
        y_predicted = model.predict(test_tensor)
        y_predicted = y_predicted.flatten()
        y_predicted = np.where(y_predicted > 0.5, 1, 0)
        y_predicted = y_predicted.tolist()
        disaster_tweet_ids = [str(df.loc[i, 'id']) for i in range(len(y_predicted)) if y_predicted[i] == 1]
        texts=[df.loc[i,'text'] for i in range(len(y_predicted))if y_predicted[i]==1]
        print("-----Disater tweets -----")
        for t in texts:
            print(t)
        data = {'disaster_tweet_ids':disaster_tweet_ids}
        return data
    
    def insert_into_db(self,data):
        client=MongoClient("mongodb+srv://Sreetama_123:test@cluster1.rn1lgvm.mongodb.net/?retryWrites=true&w=majority")
        db = client['Crisis_tweets']
        Collection = db["tweets"]
        if isinstance(data, list):
            Collection.insert_many(data) 
        else:
            Collection.insert_one(data)
        print("inserted into the db sucessfully") 

    async def on_error(self, status):
        print(status)
        return True  

async def stream_tweets():
    rules = [{"value": "lang:en AND exclude:retweets", "tag": "Alerts"},{"value": "wildfire OR explosions OR bombings OR #fire OR #accident OR #floods OR #crisis OR #landslides OR #emergency OR tornado OR cyclone OR 'shots fired' OR #earthquake OR crisis OR SOS OR murder OR tsunamis OR volcanes OR #disaster OR #floods OR #Disaster AND lang:en AND exclude:retweets", "tag": "Disaster tweets"}]
    streamer = MyStreamer(60)
    stream_rules = [tweepy.StreamRule(r["value"], r["tag"]) for r in rules]

    add_rules_task = asyncio.create_task(streamer.add_rules(stream_rules))
    await add_rules_task
    await streamer.filter(tweet_fields=['text' ,'id'])

async def main():
    await stream_tweets()

asyncio.run(main())







