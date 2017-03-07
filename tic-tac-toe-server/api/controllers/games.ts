import * as express from 'express';
import { SwaggerRequest } from './swaggerInterop';
import { GamesListResponse } from '../models/GamesListResponse';
import {ErrorResponse} from "./ErrorResponse";
import {GameRepository} from "../models/gameRepository";

export function list(req: express.Request, res: express.Response) : void {
  let response = new GamesListResponse(gameRepo.games);
  res.send(response);
};

export function create(req: SwaggerRequest, res: express.Response) : void {
  let command = req.swagger.params.gameRequest.value;
  res.status(201).send(gameRepo.createGame(command.humanPlayerFirst));
};

export function details(req: SwaggerRequest, res: express.Response) : void {
  let gameId = req.swagger.params.id.value;
  if (gameRepo.getGameWithId(gameId) !== undefined) {
    res.send(gameRepo.getGameWithId(gameId));
  } else {
    res.status(404).send(new ErrorResponse("That game does not exist."));
  }
};

export function update(req: SwaggerRequest, res: express.Response) : void {
  let gameId = req.swagger.params.id.value;
  let game = gameRepo.getGameWithId(gameId);

  let command = req.swagger.params.move.value;
  console.log(command);
  gameRepo.updateGame(game, command);
  res.status(404).send(new ErrorResponse("this method has not been implemented yet."));
};



export function remove(req: SwaggerRequest, res: express.Response) : void {
  let gameId = req.swagger.params.id.value;
  gameRepo.removeGame(gameId);
  res.status(200).contentType("application/json").send();
};


let gameRepo = new GameRepository();
