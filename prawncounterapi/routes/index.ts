import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (request: Request, response: Response) => {
    response.status(200).send("Prawn Counter API is running!");
});

router.get("/count",  (request: Request, response: Response) => {

});
