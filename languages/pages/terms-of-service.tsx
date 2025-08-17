import {
    Link,
    List,
    ListItem,
    Text as TextUi,
    TextProps,
    VStack,
} from '@chakra-ui/react';
import { Heading } from '@components/ui';
import { forwardRef } from 'react';

const Text = forwardRef((props: TextProps, ref: any) => {
    return <TextUi {...props} lineHeight="1.7" ref={ref} />;
});

export const termsOfService = {
    heading: {
        vi: 'Điều khoản dịch vụ',
        en: 'Terms of Service',
    },
    content: {
        vi: () => (
            <VStack align="stretch" spacing="4">
                <Heading>Quy định chung</Heading>
                <Text>
                    Khách hàng sử dụng dịch vụ tại Copybox, hãy đảm bảo rằng
                    khách hàng đọc kỹ và hoàn toàn đồng ý theo những điều khoản
                    sử dụng dịch vụ của chúng tôi để có một trải nghiệm tốt
                    nhất.
                </Text>
                <Text>
                    Thông tin trên trang web có quyền thay đổi, chỉnh sửa, thêm
                    hoặc lược bỏ bất kỳ phần nào trong Quy định và Điều kiện sử
                    dụng, vào bất cứ lúc nào, các thay đổi có hiệu lực ngay khi
                    được đăng trên trang web mà không cần thông báo trước. Quý
                    khách vui lòng kiểm tra thường xuyên để cập nhật những thay
                    đổi của chúng tôi.
                </Text>
                <Heading>Điều kiện giao dịch chung</Heading>
                <Text>
                    Khách hàng khi lựa chọn sử dụng các sản phẩm và dịch vụ của
                    Copybox đồng nghĩa với việc phải chấp nhận tuân thủ các điều
                    khoản, chính sách, thỏa thuận sử dụng dịch vụ đã được công
                    bố trên Website của Copybox. Ngoài ra, khi sử dụng các dịch
                    vụ cụ thể của chúng tôi, khách hàng phải tuân theo các điều
                    khoản và điều kiện riêng áp dụng cho từng dịch vụ đó theo
                    từng thời điểm.
                </Text>
                <Text>
                    Trường hợp có bất kỳ điều khoản nào của điều khoản sử dụng
                    này hết hiệu lực hoặc không thể thi hành vì bất cứ lý do gì
                    sẽ chỉ ảnh hưởng đến điều, khoản đã xác định hết hiệu lực đó
                    và không ảnh hưởng đến hiệu lực của các điều khoản còn lại.
                    Nếu có sự khác biệt giữa điều khoản sử dụng này và các thỏa
                    thuận sử dụng dịch vụ khác của Copybox thì quy định mới nhất
                    sẽ có hiệu lực.
                </Text>
                <Heading>
                    Nghĩa vụ của người bán và nghĩa vụ của khách hàng
                </Heading>
                <Heading fontSize="md">Trách nhiệm của Copybox</Heading>
                <Text>
                    Cung cấp đầy đủ và chính xác các thông tin về sản phẩm, dịch
                    vụ Copybox cung cấp.
                </Text>
                <Text>
                    Đảm bảo tính chính xác, trung thực của thông tin về sản
                    phẩm, dịch vụ Copybox cung cấp trên website.
                </Text>
                <Text>
                    Tuân thủ quy định của pháp luật về thanh toán trực tuyến,
                    bảo vệ quyền lợi người tiêu dùng và các quy định của pháp
                    luật có liên quan
                </Text>
                <Text>
                    Thực hiện đầy đủ nghĩa vụ thuế theo quy định của pháp luật.
                </Text>
                <Text>
                    Giải đáp các thắc mắc và khó khăn cho người dùng trong quá
                    trình sử dụng.
                </Text>
                <Heading fontSize="md">Trách nhiệm của người mua</Heading>
                <Text>
                    Thực hiện đúng các quy định, quy trình liên quan tới dịch vụ
                    do Copybox quy định.
                </Text>
                <Text>
                    Thanh toán đầy đủ cho Copybox số tiền theo đơn đặt hàng kèm
                    theo các hóa đơn, chứng từ theo quy định (nếu có).
                </Text>
                <Text>
                    Hỗ trợ và cung cấp thông tin đầy đủ cho Copybox liên quan
                    tới các giao dịch khi Copybox có yêu cầu.
                </Text>
                <Heading>Sử dụng hợp pháp</Heading>
                <Text>
                    Copybox có toàn quyền tạm ngưng cung cấp hoặc ngăn chặn
                    quyền tiếp tục truy cập của khách hàng vào hệ thống dịch vụ
                    của Copybox khi có căn cứ hoặc có dấu hiệu nghi ngờ khách
                    hàng có dấu hiệu vi phạm pháp luật, có báo cáo, khiếu nại từ
                    bên thứ ba gửi về phản ánh tiêu cực về hoạt động của khách
                    hàng hoặc bất kỳ hoạt động nào của khách hàng khi sử dụng
                    sản phẩm mà chúng tôi nhận thấy có khả năng gây ảnh hưởng
                    đến sự an toàn của Copybox, quyền lợi ích hợp pháp của cộng
                    đồng, cơ quan, tổ chức, cá nhân khác.
                </Text>
                <Text>
                    Khi đó, để tiếp tục sử dụng sản phẩm, Copybox có quyền yêu
                    cầu khách hàng cung cấp thông tin để xác minh và/ hoặc trực
                    tiếp thực hiện cam kết để có thể tiếp tục sử dụng dịch vụ.
                    Trường hợp nhận thấy sự việc có tính chất nghiêm trọng,
                    chúng tôi có toàn quyền nhờ đến sự can thiệp của cơ quan nhà
                    nước có thẩm quyền, các đơn vị chức năng chuyên mô để đảm
                    bảo quyền và lợi ích hợp pháp cho Copybox cũng như cộng
                    đồng.
                </Text>
                <Heading>Tạm ngừng, chấm dứt cung cấp dịch vụ</Heading>
                <Text>
                    Dịch vụ do Copybox cung cấp sẽ tự động chấm dứt/ tạm ngừng
                    theo thỏa thuận của hai bên hoặc đến thời điểm hết hiệu lực
                    hợp đồng hợp tác dịch vụ.
                </Text>
                <Text>
                    Copybox có quyền tạm ngừng hoặc chấm dứt hoàn toàn việc cung
                    cấp dịch vụ mà không hoàn lại bất kỳ một chi phí nào cho
                    khách hàng trong các trường hợp sau:
                </Text>
                <List>
                    <ListItem>
                        - Khách hàng có hành vi vi phạm quy định của Điều khoản
                        sử dụng dịch vụ trong quá trình sử dụng sản phẩm, dịch
                        vụ của chúng tôi.
                    </ListItem>
                    <ListItem>
                        - Khách hàng không hợp tác và không đáp ứng phối hợp bổ
                        sung tài liệu cần thiết.
                    </ListItem>
                    <ListItem>
                        - Khách hàng sử dụng sản phẩm, dịch vụ của Copybox vào
                        bất kỳ mục đích/ hình thức nào vi phạm đến pháp luật
                        Việt Nam.
                    </ListItem>
                    <ListItem>
                        - Khách hàng lưu trữ, truyền bá các dữ liệu nào mà cấu
                        thành hoặc khuyến khích các hình thức phạm tội, hoặc các
                        dữ liệu mang tính vi phạm luật sở hữu trí tuệ hoặc xâm
                        phạm các quyền lợi của bất kỳ cá nhân nào.
                    </ListItem>
                    <ListItem>
                        - Khách hàng sử dụng website để phá hoại một website
                        khác.
                    </ListItem>
                    <ListItem>
                        - Khách hàng sử dụng các chương trình có khả năng làm
                        tắc nghẽn hoặc đình trệ hệ thống gây cạn kiệt tài
                        nguyên, làm quá tải hệ thống và bộ vi xử lý bộ nhớ.
                    </ListItem>
                    <ListItem>
                        - Khách hàng có những vi phạm khác mà cơ quan nhà nước
                        có thẩm quyền yêu cầu đóng website.
                    </ListItem>
                    <ListItem>
                        - Khách hàng không thanh toán các chi phí đúng hạn.
                    </ListItem>
                    <ListItem>
                        - Khách hàng có hành vi làm ảnh hưởng đến uy tín và
                        thương hiệu quả Copybox trên các phương tiện thông tin
                        đại chúng.
                    </ListItem>
                </List>
                <Heading>Liên kết đến website khác</Heading>
                <Text>
                    Website cung cấp một số liên kết tới trang web hoặc nguồn dữ
                    liệu khác. Khách hàng tự chịu trách nhiệm khi sử dụng các
                    liên kết này. Copybox không tiến hành thẩm định hay xác thực
                    nội dung, tính chính xác, quan điểm thể hiện tại các trang
                    web và nguồn liên kết này. Copybox từ chối bất cứ trách
                    nhiệm pháp lý nào liên quan đến tính chính xác, nội dung thể
                    hiện, mức độ an toàn của các thông tin trên các trang web và
                    nguồn dữ liệu nói trên.
                </Text>
                <Heading>Đảm bảo cung cấp dịch vụ</Heading>
                <Text>
                    Copybox sẽ không bảo đảm rằng sản phẩm của chúng tôi sẽ luôn
                    luôn sẵn sàng, luôn có thể sử dụng, không bao giờ bị gián
                    đoạn, đúng thời gian, không có lỗi bởi các sự cố như:
                    Hacker, mất mạng Internet trên diện rộng…. Tuy nhiên,
                    Copybox và các nhân viên của Copybox sẽ cam kết cố gắng
                    trong mọi điều kiện và làm hết sức khả năng có thể để đảm
                    bảo rằng Sản phẩm và Dịch vụ của chúng tôi luôn được sẵn
                    sàng cho việc sử dụng. Copybox cam kết nỗ lực khắc phục sự
                    gián đoạn và đưa ra sự điều chỉnh, sửa chữa và hỗ trợ trong
                    khả năng có thể để phục hồi hệ thống nhanh chóng.
                </Text>
                <Heading>Cam kết bảo mật thông tin cá nhân khách hàng</Heading>
                <Text>
                    Chúng tôi cam kết bảo đảm an toàn thông tin cho khách hàng
                    khi đăng ký thông tin cá nhân với công ty chúng tôi. Chúng
                    tôi cam kết không trao đổi mua bán thông tin Khách hàng vì
                    mục đích thương mại. Mọi sự chia sẻ và sử dụng thông tin
                    khách hàng trong Copybox hoặc với đối tác kinh doanh, nhà
                    cung cấp dịch vụ, đại lý bên thứ ba được ủy quyền, cam kết
                    thực hiện theo chính sách bảo mật của công ty. Chúng tôi đề
                    cao sự hài lòng, tin tưởng về bảo mật thông tin cá nhân của
                    khách hàng khi tham gia và sử dụng những dịch vụ của chúng
                    tôi.
                </Text>
                <Text>
                    Để bảo mật thông tin của khách hàng tốt nhất, chúng tôi
                    khuyến cáo khách hạn chế truy cập tài khoản bằng đăng nhập
                    tự động, chú ý chế độ sao lưu password và đảm bảo đăng xuất
                    khỏi tài khoản khi sử dụng máy tính chung để đăng nhập tài
                    khoản trên website của chúng tôi. Chúng tôi sẽ không chịu
                    trách nhiệm khi những thông tin cá nhân của quý khách bị rò
                    rỉ vì những lý do trên.
                </Text>
                <Heading>Giải quyết thắc mắc, khiếu nại, tranh chấp</Heading>
                <Text>
                    Mọi trường hợp đóng góp ý, thắc mắc, khiếu nại, khách hàng
                    vui lòng nào gửi về Copybox theo các phương thức sau:
                </Text>
                <Heading>Địa chỉ</Heading>
                <List>
                    <ListItem>
                        - Đà Nẵng: 42/1A đường 3/2, Quận Thanh Khê, Thành phố Đà
                        Nẵng
                    </ListItem>
                </List>
                <Heading>Liên hệ</Heading>
                <List>
                    <ListItem>
                        - Điện thoại:{' '}
                        <Link color="brand" href="tel:0932586532">
                            0932 586 532
                        </Link>
                    </ListItem>
                    <ListItem>
                        - Website:{' '}
                        <Link
                            color="brand"
                            href="https://copybox.app"
                            target="_blank"
                        >
                            https://copybox.app
                        </Link>
                    </ListItem>
                    <ListItem>
                        - Email:{' '}
                        <Link color="brand" href="mailto:duyvan@hilab.asia">
                            duyvan@hilab.asia
                        </Link>
                    </ListItem>
                </List>
                <Text>
                    Tùy thuộc vào tính chất phức tạp của nội dung khiếu nại,
                    Copybox sẽ có thời hạn xử lý tương ứng. Kết quả giải quyết
                    khiếu nại sẽ được thông báo tới khách hàng, trường hợp cần
                    thiết, Copybox có thể mời người khiếu nại tới làm việc trực
                    tiếp. Copybox sẽ nỗ lực để luôn giải quyết các khiếu nại của
                    khách hàng trong thời gian sớm nhất và trên tinh thần thương
                    lượng, hòa giải, tôn trọng, hai bên cùng có lợi.
                </Text>
            </VStack>
        ),
        en: () => (
            <VStack align="stretch" spacing="4">
                <Heading>General Provisions</Heading>
                <Text>
                    Customers using the services provided by Copybox should
                    ensure that they have carefully read and fully agreed to our
                    Terms of Service in order to have the best experience
                    possible. The information on the website may be changed,
                    edited, added, or removed at any time without prior notice.
                    Changes will take effect immediately upon being posted on
                    the website. Please check regularly for updates to our
                    policies.
                </Text>
                <Heading>General Transaction Conditions</Heading>
                <Text>
                    By choosing to use Copybox's products and services,
                    customers agree to comply with the terms, policies, and
                    agreements published on Copybox's website. Furthermore,
                    customers must adhere to the specific terms and conditions
                    applicable to each service at any given time.
                </Text>
                <Text>
                    In the event that any provision of these Terms of Service
                    becomes invalid or unenforceable for any reason, the effect
                    will only apply to the determined invalid provision and not
                    the remaining provisions. In case of discrepancies between
                    these Terms of Service and other service agreements of
                    Copybox, the latest regulation will prevail.
                </Text>
                <Heading>Seller and Buyer Obligations</Heading>
                <Heading>Responsibilities of Copybox:</Heading>
                <List>
                    <ListItem>
                        1. Provide accurate and comprehensive information about
                        the products and services offered by Copybox.
                    </ListItem>
                    <ListItem>
                        2. Ensure the accuracy and authenticity of product and
                        service information on the website.
                    </ListItem>
                    <ListItem>
                        3. Comply with online payment regulations, consumer
                        protection laws, and other relevant legal provisions.
                    </ListItem>
                    <ListItem>
                        4. Fulfill tax obligations according to the law.
                    </ListItem>
                    <ListItem>
                        5. Address customer inquiries and difficulties
                        encountered during usage.
                    </ListItem>
                </List>
                <Heading>Responsibilities of the buyer:</Heading>
                <List>
                    <ListItem>
                        1. Follow the rules and procedures related to the
                        services as set forth by Copybox.
                    </ListItem>
                    <ListItem>
                        2. Make full payment to Copybox according to the order,
                        including any relevant invoices or documentation (if
                        applicable).
                    </ListItem>
                    <ListItem>
                        3. Support and provide complete information to Copybox
                        regarding transactions when requested.
                    </ListItem>
                    <ListItem>4. Use the services legally.</ListItem>
                </List>
                <Text>
                    Copybox reserves the right to temporarily suspend or block a
                    customer's access to its service system if there is evidence
                    or suspicion of legal violations, complaints from third
                    parties about the customer's activities, or any customer
                    actions that may compromise the safety of Copybox or the
                    legal interests of the community, organizations, or
                    individuals.
                </Text>
                <Text>
                    In such cases, Copybox may require customers to provide
                    verification information and/or make direct commitments to
                    resume service usage. If the situation is deemed serious,
                    Copybox may seek intervention from competent authorities or
                    specialized agencies to ensure legal rights and interests
                    for itself and the community.
                </Text>
                <Heading>Suspension or Termination of Services</Heading>
                <Text>
                    Services provided by Copybox will automatically
                    terminate/suspend based on mutual agreement or upon
                    expiration of the service contract. Copybox reserves the
                    right to suspend or terminate services without refunding any
                    costs to the customer in the following cases:
                </Text>
                <List>
                    <ListItem>
                        1. Customer violation of the Terms of Service during the
                        use of our products and services.
                    </ListItem>
                    <ListItem>
                        2. Customer non-cooperation or failure to provide
                        necessary documentation.
                    </ListItem>
                    <ListItem>
                        3. Customer use of Copybox products and services for
                        purposes or activities that violate Vietnamese law.
                    </ListItem>
                    <ListItem>
                        4. Customer storage or dissemination of data that
                        constitutes or encourages criminal activity, or data
                        that infringes intellectual property rights or the
                        interests of any individual.
                    </ListItem>
                    <ListItem>
                        5. Customer use of the website to damage another
                        website.
                    </ListItem>
                    <ListItem>
                        6. Customer use of programs that may cause congestion or
                        system disruption, deplete resources, or overload the
                        system and processor.
                    </ListItem>
                    <ListItem>
                        7. Other violations as requested by competent
                        authorities to close the website.
                    </ListItem>
                    <ListItem>
                        8. Customer failure to make payments on time.
                    </ListItem>
                    <ListItem>
                        9. Customer activities that negatively affect the
                        reputation and brand of Copybox in the media.
                    </ListItem>
                </List>
                <Heading>Links to Other Websites</Heading>
                <Text>
                    The website provides several links to other websites or data
                    sources. Customers assume responsibility for using these
                    links. Copybox does not assess or verify the content,
                    accuracy, or views expressed on these websites and linked
                    sources. Copybox disclaims any legal liability related to
                    the accuracy, content, safety, or information on these
                    websites and data sources.
                </Text>
                <Heading>Service Guarantees</Heading>
                <Text>Copybox does not guarantee that our products</Text>
                <Heading>Address</Heading>
                <List>
                    <ListItem>
                        - Da Nang: 42/1A 3/2 Street, Thanh Khe District, Da Nang
                        City
                    </ListItem>
                </List>
                <Heading>Contact</Heading>
                <List>
                    <ListItem>
                        - Phone:{' '}
                        <Link color="brand" href="tel:0932586532">
                            0932 586 532
                        </Link>
                    </ListItem>
                    <ListItem>
                        - Website:{' '}
                        <Link
                            color="brand"
                            href="https://copybox.app"
                            target="_blank"
                        >
                            https://copybox.app
                        </Link>
                    </ListItem>
                    <ListItem>
                        - Email:{' '}
                        <Link color="brand" href="mailto:duyvan@hilab.asia">
                            duyvan@hilab.asia
                        </Link>
                    </ListItem>
                </List>
                <Text>
                    Depending on the complexity of the complaint, Copybox will
                    set a corresponding processing deadline. The resolution of
                    the complaint will be notified to the customer. If
                    necessary, Copybox may invite the complainant for a direct
                    meeting. Copybox will strive to resolve customer complaints
                    as soon as possible and in a spirit of negotiation,
                    conciliation, respect, and mutual benefit.
                </Text>
            </VStack>
        ),
    },
};
