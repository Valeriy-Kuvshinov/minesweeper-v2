import express from 'express'
import { submitScore, sendMail } from './utility.controller.js'

export const utilRoutes = express.Router()

utilRoutes.post('/mail', sendMail)
utilRoutes.post('/score', submitScore)