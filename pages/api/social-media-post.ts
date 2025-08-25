import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@lib/session';
import axios from 'axios';

interface PostToFacebookRequest {
    message: string;
    pageId: string;
    accessToken: string;
}

interface FacebookPostResponse {
    id?: string;
    error?: {
        message: string;
        type: string;
        code: number;
    };
}

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('📝 Social Media Post API called:', {
        method: req.method,
        platform: req.body?.platform,
        hasMessage: !!req.body?.message,
        hasPageId: !!req.body?.pageId,
        hasAccessToken: !!req.body?.accessToken,
    });

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get user session from iron-session
        const userId = req.session.userId;

        // Check if user is logged in
        if (!userId) {
            console.log('❌ Unauthorized access attempt');
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Bạn cần đăng nhập để sử dụng tính năng này.',
            });
        }

        const { platform, message, pageId, accessToken } = req.body;

        if (!platform || !message) {
            console.log('❌ Missing required fields:', {
                platform: !!platform,
                message: !!message,
            });
            return res
                .status(400)
                .json({ error: 'Platform and message are required' });
        }

        // Handle Facebook posting
        if (platform === 'facebook') {
            if (!pageId || !accessToken) {
                return res
                    .status(400)
                    .json({
                        error: 'Page ID and access token are required for Facebook',
                    });
            }

            try {
                // Post to Facebook Page using Graph API
                const facebookResponse = await axios.post(
                    `https://graph.facebook.com/v18.0/${pageId}/feed`,
                    {
                        message: message,
                        access_token: accessToken,
                    }
                );

                const postData: FacebookPostResponse = facebookResponse.data;

                if (postData.error) {
                    return res.status(400).json({
                        success: false,
                        error: postData.error.message,
                        platform: 'Facebook',
                    });
                }

                return res.status(200).json({
                    success: true,
                    platform: 'Facebook',
                    postId: postData.id,
                    message: 'Đăng bài thành công',
                });
            } catch (error: any) {
                console.error(
                    'Facebook API Error:',
                    error.response?.data || error.message
                );

                // Handle specific Facebook API errors
                if (error.response?.data?.error) {
                    const fbError = error.response.data.error;
                    let errorMessage = fbError.message || 'Facebook API error';

                    // Provide more user-friendly error messages
                    if (fbError.code === 190) {
                        errorMessage =
                            'Token truy cập đã hết hạn hoặc không hợp lệ. Vui lòng kết nối lại trang Facebook.';
                    } else if (fbError.code === 200) {
                        errorMessage =
                            'Không có quyền đăng bài lên trang này. Vui lòng kiểm tra quyền quản lý trang.';
                    } else if (fbError.code === 100) {
                        errorMessage =
                            'Tham số không hợp lệ. Vui lòng kiểm tra lại nội dung bài đăng.';
                    } else if (fbError.type === 'OAuthException') {
                        errorMessage =
                            'Lỗi xác thực Facebook. Vui lòng đăng nhập lại.';
                    }

                    return res.status(400).json({
                        success: false,
                        error: errorMessage,
                        platform: 'Facebook',
                        code: fbError.code,
                    });
                }

                // Handle network errors
                if (
                    error.code === 'ENOTFOUND' ||
                    error.code === 'ECONNREFUSED'
                ) {
                    return res.status(500).json({
                        success: false,
                        error: 'Không thể kết nối đến Facebook. Vui lòng kiểm tra kết nối mạng.',
                        platform: 'Facebook',
                    });
                }

                return res.status(500).json({
                    success: false,
                    error: 'Lỗi không xác định khi đăng bài lên Facebook',
                    platform: 'Facebook',
                });
            }
        }

        // Handle other platforms (Twitter, LinkedIn, Instagram)
        // For now, return not implemented
        return res.status(501).json({
            success: false,
            error: `${platform} posting is not implemented yet`,
            platform: platform,
        });
    } catch (error: any) {
        console.error('Social Media Post API Error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
}

export default withIronSessionApiRoute(handler, sessionOptions);