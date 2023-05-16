// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'
import Cookies from 'cookies'

// type Data = {
//   name: string
// }

//trong trường hợp có sử dụng request body, thay vì mình parse thì nó chuyển trực tiếp lên server lun
//xem thêm API routes/API Middewares phần custom
export const config = {
    api: {
        bodyParser: false,
    }
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    return new Promise((resolve) => {
        //convert cookies to header Authorization
        const cookies = new Cookies(req, res)
        const accessToken = cookies.get('access_token')
        if(accessToken) {
            req.headers.authorization = `Bearer ${accessToken}`
        }

        //don't send cookies to API SERVER
        req.headers.cookie = ''

        //Với trường hợp này proxy sẽ tự xử lý và trả về response cho client luôn
        proxy.web(req, res, {
            target: process.env.API_URL,
            changeOrigin: true,
            selfHandleResponse: false,//không muốn tự handle response thì phải là false
        })

        //Khi ma proxy trả về response rồi thì mình sẽ xử lý thêm là resolve xong rồi đó. 
        //Nextjs đợi tui xíu tui đi proxy, khi nào có response thì tui báo ông. Thì lúc đó hk còn thấy API resolved with sending.....
        proxy.once('proxyRes', () => {
            resolve(true)
        })
    })
    
//   res.status(200).json({ name: 'PATH - Match all here' })
}
