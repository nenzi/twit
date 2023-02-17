import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { errorResponse, successResponse, handleResponse } from "../helpers/utility";
import { TweetServices } from "../services/tweet.services";

export const createTweet = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, "Validation Error", errors.array());

  let { text, userId } = req.body;

  try {
    const tweetService = new TweetServices();

    const tweet = await tweetService.create({ text, userId });

    return successResponse(res, "Tweet", tweet.data);
  } catch (err) {
    console.log(err);
    return errorResponse(res);
  }
};

export const deleteTweet = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, "Validation Error", errors.array());

  let { tweetId } = req.body;

  try {
    const tweetService = new TweetServices();
    const tweet = await tweetService.delete({ id: tweetId });

    return successResponse(res, "Deleted successfull", null);
  } catch (err) {
    return errorResponse(res);
  }
};

export const allTweet = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, "Validation Error", errors.array());

  let { userId } = req.body;

  try {
    const tweetService = new TweetServices();
    const tweet = await tweetService.all(userId);
    return successResponse(res, "All Tweet", tweet.data);
  } catch (error) {
    return errorResponse(res);
  }
};

export const commentTweet = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, "Validation Error", errors.array());

  let { tweetId, text } = req.body;

  try {
    const tweetService = new TweetServices();
    const comment = await tweetService.comment({ text, tweetId });
    return successResponse(res, comment.message, comment.data);
  } catch (error) {
    return errorResponse(res);
  }
};

export const likeTweet = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, "Validation Error", errors.array());

  let { tweetId } = req.body;

  try {
    const tweetService = new TweetServices();
    const likedTwit = await tweetService.liketweet({ tweetId });
    return successResponse(res, likedTwit.message, likedTwit.data);
  } catch (error) {
    return errorResponse(res);
  }
};