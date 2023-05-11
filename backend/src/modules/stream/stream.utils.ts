const axios = require('axios')
const cheerio = require('cheerio')

import { MovieSearchCard } from "./index";


/**
 * Функция получающая данные с кинопоиска.
 * */
export async function getMoviesList(movieName: string = 'order', page: number = 1, limit: number = 10): Promise<MovieSearchCard[]> {
    const url: string = `https://www.kinopoisk.ru/s/type/film/list/1/find/${movieName}/order/relevant/page/${page}/perpage/${limit}/`
    console.log(url)
    let data: Array<MovieSearchCard> = []
    await axios.get(url).then((html) => {
        const $ = cheerio.load(html.data)
        const baseUrl: string = 'https://www.kinopoisk.ru'

        //TODO:Сюда же впендюриваем поиск по рутрекеру.

        $('#block_left_pad > div > div.search_results.search_results_last > div')
            .each((i, elem) => {
                $(elem).each((i, elem) => {

                    if(!$(elem).find('div.info > p > a').text()) {
                        return
                    }

                    if(!$(elem).find('p > a').attr('href')) {
                        return
                    }

                    if(!$(elem).find('div.right > div').text()) {
                        return
                    }

                    data.push({
                        ruName: $(elem).find('div.info > p > a').text(),
                        year: $(elem).find('div.info > p > span').text(),
                        originalName: $(elem).find('div.info > span:nth-child(2)').text(),
                        imageUrl: `${baseUrl}${$(elem).find('p > a > img').attr('title')}`,
                        fullDataUrl: `${baseUrl}${$(elem).find('p > a').attr('href')}`,
                        rating: $(elem).find('div.right > div').text(),
                        hash: '',
                        filesName: ''
                    })
                })
            })
    })
   return data
}