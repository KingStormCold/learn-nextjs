// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy, { ProxyResCallback } from 'http-proxy'
import Cookies from 'cookies'

type Data = {
  message: string
}

//trong trường hợp có sử dụng request body, thay vì mình parse thì nó chuyển trực tiếp lên server lun
//xem thêm API routes/API Middewares phần custom
export const config = {
    api: {
        bodyParser: false,
    }
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.method !== 'POST') {
        return res.status(404).json({ message: 'method not supported' })
    }
    return new Promise((resolve) => {
        console.log('login request')
        //don't send cookies to API SERVER
        req.headers.cookie = ''

        const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
            let body = ''
            proxyRes.on('data', function(chunk) {
                //ra dc dạng chuỗi, streaming data cho Nextjs
                body += chunk
            })

            proxyRes.on('end', function(){
                try {
                    //Parse ra payload , cái mong muốn nhận dc là payload với object là accessToken + expireAt
                    const {accessToken, expiredAt} = JSON.parse(body)

                    //convert token to cookies
                    const cookies = new Cookies(req, res, {secure: process.env.NODE_ENV !== 'development'})
                    cookies.set('access_token', accessToken, {
                        httpOnly: true,//tại sao lại cần httpOnly, vì khi dùng document.cookies nó sẽ hk có access_token, nếu website mình có bị XSS
                        // thì nó có lấy cookies bằng document.cookies thì nó sẽ hk lấy được
                        sameSite: 'lax',// dối với Strict thì bạn đi từ website khác tới website của mình, thì nó sẽ hk gửi cookies lên server, nếu bạn reload sẽ chạy được
                        //đối với lax bạn đi từ website khác tới website của mình, thì lúc đó cookies sẽ được gửi lên
                        expires: new Date(expiredAt)
                    })

                    //ông thần res có thể ép kiểu về NextApiResponse
                    ;(res as NextApiResponse).status(200).json({message: 'login successfully'})
                } catch(error) {
                    ;(res as NextApiResponse).status(500).json({message: 'something went wrong'})
                }
                resolve(true)
            })
        }

        //Khi ma proxy trả về response rồi thì mình sẽ xử lý thêm là resolve xong rồi đó. 
        //Nextjs đợi tui xíu tui đi proxy, khi nào có response thì tui báo ông. Thì lúc đó hk còn thấy API resolved with sending.....
        //response tui muốn tự xử lý lấy, thì xử lý bằng hanldeLoginResponse
        proxy.once('proxyRes', handleLoginResponse)
    
        proxy.web(req, res, {
            target: process.env.API_URL,
            changeOrigin: true,
            selfHandleResponse: true,//muốn tự handle response thì phải là true
        })

        
    })
    
//   res.status(200).json({ name: 'PATH - Match all here' })
}
