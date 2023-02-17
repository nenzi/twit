import { CreateTweet } from "../interface";
import Tweet from "../models/Twit";
import Comment from "../models/Comment";
import { fnResponse } from "../helpers/utility";

export class TweetServices {
  public async create({ text, userId }: CreateTweet) {
    try {
      const user = await Tweet.create({ text, userId });
      return fnResponse({ status: true, message: `Tweet Posted successfully!`, data: user });
    } catch (error) {
      // console.log(error);
      return fnResponse({ status: false, message: `An error occured - ${error}` });
    }
  }

  public async delete({ id }) {
    try {
      const tweet = await Tweet.destroy({ where: { id: id } });
      return fnResponse({ status: true, message: `Tweet Deleted successfully!`, data: tweet });
    } catch (error) {
      // console.log(error);
      return fnResponse({ status: false, message: `An error occured - ${error}` });
    }
  }

  public async all({ userId }) {
    try {
      const tweets = await Tweet.findAll({ where: { userId: userId } });
      return fnResponse({ status: true, message: `All Tweets!`, data: tweets });
    } catch (error) {
      // console.log(error);
      return fnResponse({ status: false, message: `An error occured - ${error}` });
    }
  }

  public async comment({ text, tweetId }) {
    try {
      const user = await Comment.create({ text, tweetId });
      return fnResponse({ status: true, message: `Comment Posted successfully!`, data: user });
    } catch (error) {
      // console.log(error);
      return fnResponse({ status: false, message: `An error occured - ${error}` });
    }
  }

  public async liketweet({ tweetId }) {
    try {
      const like = await Tweet.findOne({ where: { id: tweetId } });

      const data = {
        like: like!.likes + 1,
      };
      const updateTweet = await Tweet.update(data, { where: { id: tweetId } });
      return fnResponse({ status: true, message: `Liked Twit successfully!`, data: updateTweet });
    } catch (error) {
      // console.log(error);
      return fnResponse({ status: false, message: `An error occured - ${error}` });
    }
  }
}
