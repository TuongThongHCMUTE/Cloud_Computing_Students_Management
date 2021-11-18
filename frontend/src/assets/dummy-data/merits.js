const merits = [
    {
        id: 'ethnic',
        categories: [
            {
                id: 'mandatory',
                items: [
                    {
                        id: 1,
                        content: 'Có lòng yêu nước, trung thành với mục tiêu, lý tưởng cách mạng của Đảng.',
                    },
                    {
                        id: 2,
                        content: 'Không vi phạm pháp luật và các quy chế, nội quy của trường, lớp, quy định của địa phương cư trú, nơi công cộng.'
                    }, 
                    {
                        id: 3,
                        content: 'Điểm rèn luyện đạt từ 80 điểm trở lên (trên thang điểm 100 theo Quy định về việc đánh giá công tác học sinh, sinh viên của các trường Đại học, Cao đẳng và Trung cấp chuyên nghiệp do Bộ Giáo dục và Đào tạo ban hành). Đối với những trường đặc thù không đánh giá rèn luyện sinh viên theo quy định của Bộ Giáo dục và Đào tạo thì điểm rèn luyện được tính quy đổi phải đạt loại Giỏi.'
                    },
                    {
                        id: 4,
                        content: 'Phân tích chất lượng Đoàn viên cuối năm (đối với Hội viên là Đoàn viên) đạt Xuất sắc. Đối với đơn vị có phân tích chất lượng Hội viên thì kết quả phân tích chất lượng cũng phải đạt Xuất sắc.'
                    }                 
                ]
            },
            {
                id: 'others',
                items: [
                    {
                        id: 1,
                        content: 'Là thành viên chính thức đội thi tìm hiểu về chủ nghĩa Mác – Lênin, tư tưởng Hồ Chí Minh từ cấp trường trở lên.'
                    },
                    {
                        id: 2,
                        content: 'Có tham luận, bài viết được trình bày tại các diễn đàn học thuật về các mônkhoa học Mác - Lênin, tư tưởng Hồ Chí Minh từ cấp trường trở lên.'
                    },
                    {
                        id: 3,
                        content: 'Là Thanh niên tiên tiến làm theo lời Bác các cấp hoặc là điển hình được biểu dương trong việc thực hiện học tập và làm theo tư tưởng, tấm gương đạo đức, phong cách Chủ tịch Hồ Chí Minh.'
                    },
                    {
                        id: 4,
                        content: 'Có hành động dũng cảm cứu người bị nạn, bắt cướp, giúp người neo đơn, người nghèo, người gặp khó khăn, hoạn nạn trong tình trạng nguy hiểm và cấp thiết được khen thưởng, biểu dương từ trường, cấp xã, phường trở lên hoặc được nêu gương trên các phương tiện truyền thông đại chúng.'
                    }
                ]
            }
        ] 
    },
    {
        id: 'learning',
        categories: [
            {
                id: 'mandatory',
                items: [
                    {
                        id: 1,
                        content: 'Có động cơ, thái độ học tập đúng đắn; không gian lận trong thi cử, không nợ môn, học phần hoặc tín chỉ trong năm học'
                    },
                    {
                        id: 2,
                        content: 'Đối với sinh viên các trường Đại học, Học viện: điểm trung bình chung học tập cả năm học đạt từ 8,5/10 trở lên (đối với các trường đào tạo theo niên chế) hoặc từ 3,4/4 trở lên (đối với các trường đào tạo theo học chế tín chỉ). Đối với sinh viên các trường Cao đẳng: điểm trung bình chung học tập cả năm học đạt từ 8,0/10 trở lên (đối với các trường đào tạo theo niên chế) hoặc từ 3,2/4 trở lên (đối với các trường đào tạo theo học chế tín chỉ). Đối với sinh viên khối ngành năng khiếu (thể dục thể thao, nghệ thuật) điểm trung bình chung cả năm học đạt từ 7,5/10 (đối với các trường đào tạo theo niên chế) hoặc từ 3,0/4 trở lên (đối với các trường đào tạo theo học chế tín chỉ).'
                    }
                ]
            },
            {
                id: 'others',
                items: [
                    {
                        id: 1,
                        content: 'Có đề tài nghiên cứu khoa học (tham gia với tư cách là chủ nhiệm đề tài hoặc đồng tác giả của đề tài hoặc thành viên nhóm nghiên cứu đề tài) trong năm học được hội đồng khoa học cấp trường nghiệm thu đánh giá từ 8,0 điểm trở lên hoặc đạt giải cấp trường trở lên (đối với các trường Đại học, Học viện); được hội đồng khoa học cấp khoa nghiệm thu đánh giá từ 8,0 điểm trở lên hoặc đạt giải cấp khoa trở lên (đối với các trường Cao đẳng).'
                    },
                    {
                        id: 2,
                        content: 'Có đề tài nghiên cứu khoa học sinh viên tham gia giải thưởng sinh viên nghiên cứu khoa học Euréka hoặc tham gia giải thưởng nghiên cứu khoa học cấp thành phố và trung ương.'
                    },
                    {
                        id: 3,
                        content: 'Có ít nhất 01 bài viết về lĩnh vực chuyên môn đang theo học, đăng tải trên các sản phẩm của các cơ quan truyền thông uy tín hoặc các báo, tạp chí khoa học chuyên ngành của trường hoặc có bài tham luận tham gia các hội thảo khoa học cấp trường trở lên.'
                    },
                    {
                        id: 4,
                        content: 'Có sản phẩm sáng tạo được cấp bằng sáng chế, cấp giấy phép xuất bản hoặc đạt các giải thưởng từ cấp tỉnh, thành phố trở lên.'
                    },
                    {
                        id: 5,
                        content: 'Là thành viên đội tuyển tham gia các cuộc thi học thuật cấp quốc gia, quốc tế.'
                    },
                    {
                        id: 6,
                        content: 'Đạt giải thưởng trong các cuộc thi ý tưởng sáng tạo từ cấp thành phố trở lên.'
                    },
                    {
                        id: 7,
                        content: 'Đạt giải khuyến khích trở lên trong các cuộc thi chuyên môn cấp toàn quốc do các hiệp hội ngành nghề, các trường đại học, học viện, các cơ quan thông tấn, báo chí tổ chức.'
                    },
                    {
                        id: 8,
                        content: 'Đối với sinh viên khối ngành năng khiếu (thể dục thể thao, nghệ thuật) phải có thành tích nổi bật trong các cuộc thi cấp thành, toàn quốc, khu vực trở lên hoặc có tác phẩm tham gia triển lãm chuyên ngành, triển lãm cấp thành trở lên.'
                    }
                ]
            }
        ] 
    },
    {
        id: 'health',
        categories: [
            {
                id: 'mandatory',
                items: [
                    {
                        id: 1,
                        content: 'Đạt danh hiệu “Thanh niên khỏe” từ cấp trường trở lên (tiêu chuẩn cụ thể theo Hướng dẫn liên tịch số 87/2006/HDLT-ĐTN-TDTT về tiêu chuẩn thi đua và rèn luyện thể dục thể thao của các cấp bộ Đoàn và đoàn viên, thanh niên do Trung ương Đoàn TNCS Hồ Chí Minh và Ủy ban Thể dục - Thể thao ban hành).'
                    },
                    {
                        id: 2,
                        content: 'Đạt thành tích cao trong các hội thao từ cấp thành phố trở lên (Giải 1, giải 2, giải 3, khuyến khích hoặc tương đương).'
                    },
                    {
                        id: 3,
                        content: 'Là thành viên đội tuyển cấp thành phố, quốc gia các môn thể dục thể thao. Ưu tiên những sinh viên là vận động viên đạt huy chương trong các giải thi đấu cấp quốc gia, khu vực và quốc tế.'
                    }
                ]
            }
        ] 
    },
    {
        id: 'volunteer',
        categories: [
            {
                id: 'mandatory',
                items: [
                    {
                        id: 1,
                        content: 'Được khen thưởng từ cấp trường trở lên về hoạt động tình nguyện.'
                    }
                ]
            },
            {
                id: 'others',
                items: [
                    {
                        id: 1,
                        content: 'Tham gia và nhận giấy chứng nhận hoàn thành một trong các chiến dịch, chương trình sau: chiến dịch tình nguyện Mùa hè xanh, chiến dịch Xuân tình nguyện, chương trình Tiếp sức mùa thi.'
                    },
                    {
                        id: 2,
                        content: 'Tham gia ít nhất 05 ngày tình nguyện/năm (được tính theo số ngày thực tế tham gia các hoạt động tình nguyện cộng dồn. Ví dụ: sinh viên A tham gia 03 ngày tình nguyện tại mái ấm nhà mở, 01 ngày thứ bảy tình nguyện, 01 ngày Chủ nhật xanh ở những thời điểm khác nhau trong năm sẽ được tính đủ tiêu chuẩn).'
                    }
                ]
            }
        ] 
    },
    {
        id: 'integration',
        categories: [
            {
                id: 'foreign-languages',
                items: [
                    {
                        id: 1,
                        content: 'Đạt chứng chỉ ngoại ngữ trình độ B1 hoặc tương đương trở lên. Đối tượng sinh viên chuyên ngành Ngoại ngữ: chứng chỉ Ngoại ngữ được áp dụng với môn Ngoại ngữ 2 (Riêng đối với sinh viên đã có chứng chỉ IELTS, TOEFL, TOEIC và một số chứng chỉ khác thì áp dụng theo thông tư số 05/2012/TT/BGDĐT ngày 15/2/2012 của Bộ Giáo dục và Đào tạo, bảng quy đổi đính kèm).'
                    },
                    {
                        id: 2,
                        content: 'Tham gia ít nhất 01 hoạt động giao lưu quốc tế: Hội nghị, Hội thảo quốc tế, các chương trình gặp gỡ, giao lưu, hợp tác với thanh niên, sinh viên quốc tế trong và ngoài nước.'
                    },
                    {
                        id: 3,
                        content: 'Tham gia và đạt giải ba trở lên các cuộc thi kiến thức ngoại ngữ (được hiểu là cuộc thi tìm hiểu ngoại ngữ hoặc cuộc thi sử dụng ngoại ngữ để trình bày) từ cấp trường trở lên.'
                    }
                ]
            },
            {
                id: 'skills',
                items: [
                    {
                        id: 1,
                        content: 'Tham gia và hoàn thành ít nhất 01 khóa trang bị kỹ năng thực hành xã hội.'
                    },
                    {
                        id: 2,
                        content: 'Được Đoàn Thanh niên - Hội Sinh viên từ cấp trường trở lên khen thưởng về thành tích xuất sắc trong công tác Đoàn và phong trào thanh niên hoặc công tác Hội và phong trào sinh viên.'
                    }
                ]
            },
            {
                id: 'integration-activities',
                items: [
                    {
                        id: 1,
                        content: 'Tham gia tích cực ít nhất 01 hoạt động về hội nhập do cấp trường trở lên tổ chức.'
                    }
                ]
            }
        ] 
    },
    {
        id: 'others',
        categories: [
            {
                id: 'others',
                items: [
                    {
                        id: 1,
                        content: 'Tuyên truyền và giới thiệu ít nhất 01 (một) sinh viên trong năm gia nhập tổ chức Hội (đối với Hội viên), giúp đỡ và giới thiệu ít nhất 01 (một) sinh viên (đối với trường không có tổ chức Hội) hoặc 01 (một) Hội viên (đối với những trường có tổ chức Hội) kết nạp vào Đoàn TNCS Hồ Chí Minh (không áp dụng đối với các Chi Đoàn, Chi Hội 100% Đoàn viên, Hội viên).'
                    },
                    {
                        id: 2,
                        content: 'Tham gia hiến máu tình nguyện ít nhất 02 lần trong năm hoặc tham gia tích cực vào câu lạc bộ hoặc các đội, nhóm tuyên truyền, vận động hiến máu tình nguyện (có xác nhận của câu lạc bộ, đội, nhóm tham gia).'
                    },
                    {
                        id: 3,
                        content: 'Là thanh niên tiêu biểu được biểu dương, khen thưởng trên các lĩnh vực tại địa phương, đơn vị hoặc được nêu gương trên các phương tiện truyền thông đại chúng.'
                    },
                    {
                        id: 4,
                        content: 'Tham gia và đạt giải khuyến khích trở lên trong các cuộc thi tìm hiểu về văn hóa, lịch sử, xã hội trong nước và thế giới từ cấp trường trở lên.'
                    }
                ]
            }
        ] 
    },
]

export default merits;