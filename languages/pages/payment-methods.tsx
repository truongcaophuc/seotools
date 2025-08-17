import { List, ListItem, Text, VStack } from '@chakra-ui/react';
import { Heading } from '@components/ui';

export const paymentMethods = {
    heading: {
        vi: 'Hình thức thanh toán',
        en: 'Payment Methods',
    },
    content: {
        vi: () => (
            <VStack align="stretch">
                <Text>
                    Khách hàng sử dụng các dịch vụ tại Copybox có trách nhiệm
                    thanh toán đầy đủ và đúng hạn các khoản phí được thể hiện
                    trong các gói dịch vụ.
                </Text>
                <Heading>Gói Basic</Heading>
                <List>
                    <ListItem>
                        Thanh toán 100% - số tiền 1.199.000 VNĐ / 6 tháng
                    </ListItem>
                    <ListItem>
                        Thanh toán 100% - số tiền 2.388.000 VNĐ / 12 tháng
                    </ListItem>
                </List>
                <Heading>Gói Premium</Heading>
                <List>
                    <ListItem>
                        Thanh toán 100% - số tiền 3.599.000 VNĐ / 6 tháng
                    </ListItem>
                    <ListItem>
                        Thanh toán 100% - số tiền 7.188.000 VNĐ / 12 tháng
                    </ListItem>
                </List>
                <Heading>Mua thêm</Heading>
                <Text>
                    Sử dụng khi hết Credits (số lượng từ): 10.000 VNĐ / 10.000
                    từ
                </Text>
                <Heading>Hình thức thanh toán:</Heading>
                <Text>
                    Khi đăng ký dịch vụ tại Copybox, khách hàng có thể thanh
                    toán thông qua các hình thức sau:
                </Text>
                <List>
                    <ListItem>
                        <Text fontWeight="medium">
                            - Thanh toán bằng hình hình thức chuyển khoản:
                        </Text>

                        <Text>Quý khách hàng có thể thanh toán thông qua:</Text>

                        <Text>
                            - Số tài khoản: 206908888 <br />
                            Tên tài khoản: Trần Hoàng Hiệp, Ngân hàng ACB - chi
                            nhánh Đà Nẵng
                        </Text>
                    </ListItem>
                    <ListItem>
                        <Text fontWeight="medium">
                            - Thanh toán trực tiếp tại văn phòng công ty
                        </Text>
                        <Text>
                            Đà Nẵng: 42/1A đường 3/2, Quận Thanh Khê, Thành phố
                            Đà Nẵng
                        </Text>
                    </ListItem>
                </List>
            </VStack>
        ),
        en: () => (
            <VStack align="stretch">
                <Text>
                    Customers using services at Copybox are responsible for
                    fully and timely paying the fees specified in the service
                    packages.
                </Text>
                <Heading>Basic Package</Heading>
                <List>
                    <ListItem>
                        - 100% payment - 1,199,000 VND / 6 months
                    </ListItem>
                    <ListItem>
                        - 100% payment - 2,388,000 VND / 12 months
                    </ListItem>
                </List>
                <Heading>Premium Package</Heading>
                <List>
                    <ListItem>
                        - 100% payment - 3,599,000 VND / 6 months
                    </ListItem>
                    <ListItem>
                        - 100% payment - 7,188,000 VND / 12 months
                    </ListItem>
                </List>
                <Heading>Additional Purchase</Heading>
                <Text>
                    Use when Credits (word count) are exhausted: 10,000 VND /
                    10,000 words
                </Text>
                <Heading>Payment Methods:</Heading>
                <Text>
                    When registering for services at Copybox, customers can make
                    payments through the following methods:
                </Text>
                <Text>
                    <Text as="span" fontWeight="medium">
                        - Payment by bank transfer: Customers can make payments
                        through:
                    </Text>
                    <br />- Account number: 206908888 Account name: Tran Hoang
                    Hiep, ACB Bank - Da Nang branch
                </Text>
                <Text>
                    <Text as="span" fontWeight="medium">
                        - Direct payment at the company office
                        <br />
                    </Text>
                    Da Nang: 42/1A 3/2 Street, Thanh Khe District, Da Nang City
                </Text>
            </VStack>
        ),
    },
};
