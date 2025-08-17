import { generateCode } from '@share/helps/code';
import { sendEmail, templateEmail } from '@share/helps/email';
import axios from 'axios';
import { mutationField, queryField, stringArg } from 'nexus';

export const TestSendEmailMutation = mutationField('testSendEmail', {
    type: 'String',
    args: { email: stringArg() },
    async resolve(_, { email }) {
        try {
            const code = generateCode();
            // const value = `https://copybox.app/reset-password?code=${code}`;
            const content = templateEmail.signup(code);

            await sendEmail({
                toAddresses: [email],
                content,
                subject: 'Test email',
                type: 'html',
            });

            return code;
        } catch (error) {
            console.log({ error });
            return 'error send email';
        }
    },
});

const URL_WP = 'https://wp.hilab.cloud/wp-json/wp/v2/posts';

export const WpPosts = queryField('wpPosts', {
    type: 'String',
    async resolve() {
        const response = await axios.get(URL_WP);
        console.log(response.data);
        return JSON.stringify(response.data);
    },
});

const wpConfig = {
    // username: "Copyboxwp@123",
    username: 'admin',
    password: '0YUF JzyR BqiN jt13 FT4c ATe8',
};

const content = `
<p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span>MacBook Sau 7 tháng lên kệ, MacBook Air M2 giảm hơn 6 triệu đồng, mức kỷ lục của laptop Apple từng bán thị trường Việt Nam.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><a href="https://vnexpress.net/so-hoa/macbook-air-m2-duoc-ban-som-voi-gia-tu-33-trieu-dong-4493347.html" rel="dofollow" class="PlaygroundEditorTheme__link"><span>MacBook Air M2</span></a><span>  bắt đầu được phân phối chính hãng tại Việt Nam từ cuối tháng 7/2022 với  giá từ 32,9 triệu đồng cho bản RAM 8 GB, bộ nhớ trong 256 GB. Các hệ  thống bán lẻ cho biết sau nửa năm, dòng Air luôn chiếm 80% doanh số bán  ra của các mẫu MacBook chạy chip Apple </span><a href="https://vnexpress.net/so-hoa/chip-apple-m2-pro-va-m2-max-manh-the-nao-4561372.html" rel="dofollow" class="PlaygroundEditorTheme__link"><span>M2</span></a><span>.  Model này cũng giữ giá ổn định cho đến hết năm ngoái. Các đại lý chỉ  điều chỉnh 1-2 triệu đồng trong thời gian ngắn để kích cầu rồi lại đưa  về giá niêm yết.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span>Tuy nhiên, chỉ trong hai tháng đầu  năm nay, giá Macbook Air M2 đã giảm sâu từ 32,9 triệu xuống 26,4 triệu  đồng. Như vậy, sau hơn sáu tháng lên kệ, trung bình mỗi tháng MacBook  Air M2 mất giá một triệu đồng.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><p class="PlaygroundEditorTheme__paragraph"><img src="https://seobox-hilab.s3.ap-southeast-1.amazonaws.com/tandao/4842799311-absolut-elyx-hero-desktop 1.jpg?1677653091806" alt="" width="500" height="252.10503737131754"></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span>Đại diện Di Động Việt khẳng định đây là mức giảm kỷ  lục của MacBook tại thị trường Việt Nam trong thời gian ngắn. Ví dụ, so  với bản tiền nhiệm, sau hai năm </span><a href="https://vnexpress.net/so-hoa/gia-macbook-air-m1-lao-doc-4569013.html" rel="dofollow" class="PlaygroundEditorTheme__link"><span>MacBook Air M1</span></a><span>  mới hạ 6 triệu đồng. Bản Air M1 bán ra từ tháng 11/2020 với giá 29  triệu đồng. Đến tháng 1/2021, máy điều chỉnh về 27 triệu đồng và giữ giá  ổn định. Tháng 10/2021, sản phẩm tăng hai triệu đồng do nguồn hàng khan  hiếm trong Covid-19, sau đó xuống 23 triệu đồng vào tháng 11/2022.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span>Ngoài MacBook Air M2, MacBook Pro M2 dung lượng RAM 8 GB, bộ nhớ 256 GB cũng giảm từ 35,9 xuống 30,59 triệu đồng.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span>"Doanh  số của các dòng máy tính xách tay chạy chip M2 không như kỳ vọng nên  Apple quyết định điều chỉnh giá. Thị trường đang vào mùa thấp điểm, các  đại lý cũng giảm thêm để kích cầu", một hệ thống giải thích.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span>Đại  diện CellphoneS nói thêm: "Một nguyên nhân khiến MacBook Air M2 giảm  giá là nguồn hàng tồn kho quá cao, buộc phải hạ giá để thu hồi dòng  tiền".</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span>Trước đó, các đại lý ủy quyền AAR cho biết chính sách hàng kiểu "</span><a href="https://vnexpress.net/so-hoa/apple-ban-bia-kem-lac-tai-viet-nam-4554430.html" rel="dofollow" class="PlaygroundEditorTheme__link"><span>bia kèm lạc</span></a><span>"  của Apple đang đẩy nhiều sản phẩm vào tình trạng cung vượt cầu. Cụ thể,  để có thể nhập iPhone 14 Pro, các AAR phải nhập kèm cả MacBook, iPad,  chuột, bàn phím, smartwatch theo tỷ lệ 1:1, khiến một số bên sau đó phải  chấp nhận bán lỗ để giải phóng hàng tồn.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span>Một  chuyên gia trong ngành cho biết, việc điều chỉnh giá sâu khiến thị  trường laptop xáo trộn. Trước đây, trong tầm giá 33 triệu đồng, MacBook  Air M2 nằm ở phân khúc riêng. Còn nay, khi giảm về 26 triệu đồng, máy có  ưu thế hơn hẳn nhiều mẫu laptop Windows cùng tầm giá nhờ ngoại hình  đẹp, màn hình độ phân giải cao, chip xử lý vượt trội.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p>
`;

export const AddWpPost = mutationField('addWpPost', {
    type: 'Boolean',
    async resolve() {
        try {
            const response = await axios({
                url: URL_WP,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Basic ' +
                        Buffer.from(
                            `${wpConfig.username}:${wpConfig.password}`
                        ).toString('base64'),
                },
                data: {
                    title: 'New post title',
                    content,
                },
            });

            console.log({ response });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
});
