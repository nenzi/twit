import { CreateTweet } from "../interface";
import Twit from "../models/Twit";
import Comment from "../models/Comment";
import { fnResponse } from "../helpers/utility";

export class TweetServices {
  public async create({ text, userId }: CreateTweet) {
    try {
      const user = await Twit.create({ text, userId });
      return fnResponse({ status: true, message: `Tweet Posted successfully!`, data: user });
    } catch (error) {
      // console.log(error);
      return fnResponse({ status: false, message: `An error occured - ${error}` });
    }
  }

  public async delete({ id }) {
    try {
      const tweet = await Twit.destroy({ where: { id: id } });
      return fnResponse({ status: true, message: `Tweet Deleted successfully!`, data: tweet });
    } catch (error) {
      // console.log(error);
      return fnResponse({ status: false, message: `An error occured - ${error}` });
    }
  }

  public async all({ userId }) {
    console.log(userId);
    try {
      const tweets = await Twit.findAll({ where: { userId: userId } });

      return fnResponse({ status: true, message: `All Tweets!`, data: tweets });
    } catch (error) {
      // console.log(error);
      return fnResponse({ status: false, message: `An error occured - ${error}` });
    }
  }

  public async comment({ text, twitId }) {
    try {
      const twit = await Twit.findOne({ where: { id: twitId } });
      const user = await Comment.create({ text, twitId });
      return fnResponse({ status: true, message: `Comment Posted successfully!`, data: user });
    } catch (error) {
      // console.log(error);
      return fnResponse({ status: false, message: `An error occured - ${error}` });
    }
  }

  public async liketweet({ twitId }) {
    try {
      const like = await Twit.findOne({ where: { id: twitId } });

      const data = {
        likes: like!.likes + 1,
      };
      const updateTweet = await Twit.update(data, { where: { id: twitId } });
      return fnResponse({ status: true, message: `Liked Twit successfully!`, data: updateTweet });
    } catch (error) {
      // console.log(error);
      return fnResponse({ status: false, message: `An error occured - ${error}` });
    }
  }
}
