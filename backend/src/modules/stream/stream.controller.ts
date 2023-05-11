import { Router, Request, Response } from 'express'
import { MovieSearchCard } from "./index";
import { getMoviesList} from "./stream.utils";
import WebTorent from 'webtorrent'

const router = Router()
const client = new WebTorent()

let state = {

}

client.on('error', (error: Error) => {
    console.log(`${error.message}`)
})

client.on('torrent', ()=> {

})

router.get('/start/:magnet', (req: Request, res: Response) => {
    const magnet = req.params.magnet

    client.add(magnet, (torrent) => {
        const files = torrent.files.map(data => ({
            name: data.name,
            length: data.length
        }))

        res.status(200).send(files)
    })
})

router.get('/movies/:moviesName?/', async (req: Request, res: Response) => {
    let page = req.query.page;
    let limit = req.query.limit;

    let findMovies:MovieSearchCard[] = await getMoviesList(req.params.moviesName, page, limit)

    console.log(findMovies.length)

    if(findMovies.length > 0) {
        res.status(200).send(findMovies)
    } else {
        res.status(400).send({
            message: 'Фильмы не найдены!'
        })
    }
})


export default router
