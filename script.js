/* ════════════════════════════════════════════════
   FUTURESTEPS SERVICES — MAIN SCRIPT
   ════════════════════════════════════════════════ */

/* ── Cross-site visitor id ──
   Shared with the interview-prep app so one person's journey can be traced
   across both properties (see interview-prep/supabase/ANALYTICS.md). Persisted
   in localStorage on first visit here, then appended to every "Practice Now"
   link as ?aid=<id> so the app adopts the same id instead of minting its own. */
const ANON_ID_KEY = "futureStepsAnonId";

function getAnonId() {
  let id = localStorage.getItem(ANON_ID_KEY);
  if (!id) {
    id = (window.crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : "w_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
    try { localStorage.setItem(ANON_ID_KEY, id); } catch (e) {}
  }
  return id;
}

function tagPracticeLinksWithAnonId() {
  const anonId = getAnonId();
  document.querySelectorAll('a[href^="https://futuresteps-interview-prep.netlify.app"]')
    .forEach((link) => {
      const url = new URL(link.href);
      url.searchParams.set("aid", anonId);
      link.href = url.toString();
    });
}

/* ── Translations ── */
const translations = {
  vi: {
    "nav.services": "Dịch Vụ",
    "nav.gallery": "Hình Ảnh",
    "nav.about": "Giới Thiệu",
    "nav.process": "Quy Trình",
    "nav.reviews": "Cập Nhật",
    "nav.cta": "Nhận Tư Vấn Miễn Phí",
    "hero.tag": "Du Lịch &bull; Visa &bull; Du Học",
    "hero.title": 'Mở Cánh Cửa<br>Tương Lai <em>Của Bạn</em>',
    "hero.subtitle": "Chuyên gia hàng đầu về visa, du học và du lịch quốc tế tại Dallas, TX. Chúng tôi đồng hành cùng bạn từ hồ sơ đến ngày khởi hành — nhanh chóng, chính xác và tận tâm.",
    "hero.btn1": 'Tư Vấn Miễn Phí Ngay <i class="fa-solid fa-arrow-right"></i>',
    "hero.btn2": "Xem Dịch Vụ",
    "hero.badge1": "LLC Có Giấy Phép & Bảo Hiểm",
    "hero.badge2": "Tư Vấn Tiếng Việt & English",
    "hero.badge3": "Dallas–Fort Worth, TX",
    "svc.tag": "Giải Pháp Toàn Diện",
    "svc.title": 'Dịch Vụ Thiết Kế Riêng<br>Cho <em>Mục Tiêu Của Bạn</em>',
    "svc.desc": "Mỗi khách hàng có một câu chuyện khác nhau. Dù bạn cần xin visa, du học hay lên kế hoạch chuyến đi, chúng tôi đều có giải pháp phù hợp nhất.",
    "svc.visa.title": "Dịch Vụ Visa",
    "svc.visa.desc": "Xin visa du lịch, du học, lao động và định cư với tỷ lệ thành công cao. Hồ sơ được chuẩn bị kỹ lưỡng, luyện phỏng vấn bài bản và theo sát đến khi có kết quả.",
    "svc.visa.l1": "Đánh giá hồ sơ & tư vấn chiến lược",
    "svc.visa.l2": "Chuẩn bị & nộp hồ sơ chuyên nghiệp",
    "svc.visa.l3": "Luyện phỏng vấn 1-1 với chuyên gia",
    "svc.visa.l4": "Cập nhật tình trạng hồ sơ liên tục",
    "svc.study.badge": "Được Chọn Nhiều Nhất",
    "svc.study.title": "Tư Vấn Du Học",
    "svc.study.desc": "Hỗ trợ toàn diện từ chọn trường, viết hồ sơ, xin học bổng đến chuẩn bị hành trang trước khi lên đường. Con bạn xứng đáng có nền giáo dục tốt nhất.",
    "svc.study.l1": "Định hướng & chọn trường phù hợp năng lực",
    "svc.study.l2": "Hoàn thiện hồ sơ & bài luận ấn tượng",
    "svc.study.l3": "Tìm kiếm học bổng & hỗ trợ tài chính",
    "svc.study.l4": "Xin visa du học trọn gói",
    "svc.study.l5": "Chuẩn bị hành trang trước khi xuất cảnh",
    "svc.travel.title": "Thiết Kế Chuyến Đi",
    "svc.travel.desc": "Lịch trình được thiết kế riêng theo sở thích, đặt vé & khách sạn giá tốt, tư vấn bảo hiểm và hỗ trợ 24/7 trong suốt chuyến đi.",
    "svc.travel.l1": "Lịch trình cá nhân hóa theo yêu cầu",
    "svc.travel.l2": "Đặt vé máy bay & khách sạn uy tín",
    "svc.travel.l3": "Tư vấn bảo hiểm du lịch toàn diện",
    "svc.travel.l4": "Đón tiễn sân bay & hỗ trợ hậu cần",
    "gal.tag": "Điểm Đến & Trường Học",
    "gal.title": 'Khám Phá Nơi Chúng Tôi<br><em>Đưa Bạn Đến</em>',
    "gal.desc": "Từ các trường đại học danh tiếng hàng đầu Hoa Kỳ đến những vùng đất tuyệt đẹp — cơ hội đang chờ bạn.",
    "gal.schools": "Trường Đại Học & Phổ Thông Uy Tín",
    "gal.swipe": "← Vuốt ngang",
    "gal.cc": "Cao Đẳng Cộng Đồng<small>Học Phí Hợp Lý — Cơ Hội Chuyển Tiếp</small>",
    "gal.hs": "Trường Phổ Thông<small>Chương Trình Trao Đổi Quốc Tế K-12</small>",
    "gal.dc": "Dallas College<small>Dallas, TX — Cao Đẳng Cộng Đồng Uy Tín</small>",
    "gal.travel": "Điểm Du Lịch Hấp Dẫn",
    "gal.rocky": "Dãy Núi Rocky<small>Colorado</small>",
    "gal.yellow": "Vườn Quốc Gia Yellowstone<small>Wyoming / Montana</small>",
    "gal.zion": "Vườn Quốc Gia Zion<small>Utah</small>",
    "gal.beach": "Nghỉ Dưỡng Biển<small>Bãi Biển Nhiệt Đới Tuyệt Đẹp</small>",
    "gal.pnw": "Tây Bắc Thái Bình Dương<small>Oregon / Washington</small>",
    "gal.falls": "Thác Nước Hùng Vĩ<small>Khám Phá Thiên Nhiên</small>",
    "updates.tag": "Cập Nhật Di Trú",
    "updates.title": 'Bản Tin Visa & <em>Tin Tức Mới Nhất</em>',
    "updates.desc": "Cập nhật lịch visa mới nhất và các thay đổi quan trọng về chính sách di trú Hoa Kỳ.",
    "vb.title": "Bản Tin Visa — Tháng 7/2026",
    "vb.updated": "Cập nhật hàng tháng &bull; Nguồn: Bộ Ngoại Giao Hoa Kỳ",
    "vb.eb.title": '<i class="fa-solid fa-briefcase"></i> Diện Lao Động (Ngày Hành Động Cuối)',
    "vb.cat": "Diện",
    "vb.all": "Các Nước Khác",
    "vb.china": "Trung Quốc",
    "vb.india": "Ấn Độ",
    "vb.current": "Hiện hành",
    "vb.current2": "Hiện hành",
    "vb.current3": "Hiện hành",
    "vb.current4": "Hiện hành",
    "vb.current5": "Hiện hành",
    "vb.varies": "Khác nhau theo quốc gia",
    "vb.varies2": "Khác nhau theo quốc gia",
    "vb.fb.title": '<i class="fa-solid fa-users"></i> Diện Gia Đình Bảo Lãnh (Ngày Hành Động Cuối)',
    "vb.cat2": "Diện",
    "vb.all2": "Các Nước Khác",
    "vb.vn": "Việt Nam",
    "vb.desc2": "Mô Tả",
    "vb.f1.desc": "Con trưởng thành chưa kết hôn của công dân Mỹ",
    "vb.current6": "Hiện hành",
    "vb.current7": "Hiện hành",
    "vb.f2a.desc": "Vợ/chồng và con dưới 21 của thường trú nhân",
    "vb.f2b.desc": "Con trưởng thành chưa kết hôn của thường trú nhân",
    "vb.f3.desc": "Con đã kết hôn của công dân Mỹ",
    "vb.f4.desc": "Anh chị em của công dân Mỹ trưởng thành",
    "vb.source": "Xem bản tin chính thức tại travel.state.gov",
    "news.title": "Tin Tức Di Trú Mới Nhất",
    "news.n1.tag": "Cảnh Báo Hồ Sơ",
    "news.n1.title": "Quy Định Mới Của DHS Cho Phép USCIS Từ Chối Hồ Sơ Vì Chữ Ký Không Hợp Lệ — Không Có Cơ Hội Sửa",
    "news.n1.desc": "Quy định tạm thời có hiệu lực ngay (interim final rule) của Bộ An Ninh Nội Địa Hoa Kỳ (DHS) đã có hiệu lực từ ngày 10/7/2026, trao cho USCIS quyền hạn rõ ràng để từ chối bất kỳ hồ sơ xin quyền lợi di trú nào bị phát hiện có chữ ký không hợp lệ — ngay cả sau khi hồ sơ đã được chấp nhận xử lý — và giữ lại lệ phí nộp hồ sơ. Khác với trước đây, không có cơ chế để sửa chữ ký trên hồ sơ đang chờ xử lý; đương đơn phải nộp lại một hồ sơ hoàn toàn mới với chữ ký hợp lệ. USCIS cho biết số hồ sơ bị từ chối vì lý do chữ ký đã tăng từ khoảng 300 trong năm tài khóa 2021 lên gần 3.000 trong năm tài khóa 2025.",
    "news.n2.tag": "Cập Nhật Cưỡng Chế",
    "news.n2.title": "Số Vụ Bắt Giữ Của ICE Tăng Vọt Lên 10.000 Người Trong 5 Ngày Khi Chiến Dịch Trục Xuất Mở Rộng Toàn Quốc",
    "news.n2.desc": "Cơ quan Thực Thi Di Trú và Hải Quan (ICE) đã bắt giữ hơn 10.000 người trong 5 ngày cuối tháng 6 — khoảng 2.000 người mỗi ngày — khi cơ quan này chuyển từ các chiến dịch truy quét rầm rộ tại các thành phố lớn sang hình thức thực thi âm thầm hơn trên toàn quốc qua các buổi trình diện, chặn xe và bắt giữ trên đường phố. Số người bị giam giữ của ICE trong tháng 6 đã tăng lên khoảng 39.000, mức cao nhất trong năm.",
    "news.n3.tag": "Xử Lý Hồ Sơ Tị Nạn",
    "news.n3.title": "USCIS Mở Văn Phòng Tị Nạn Mới Tại Atlanta Để Tăng Năng Lực Phỏng Vấn",
    "news.n3.desc": "USCIS thông báo mở Văn Phòng Tị Nạn Atlanta mới, phụ trách bang Georgia và Alabama, với các buổi phỏng vấn tị nạn chủ động bắt đầu từ ngày 8/7/2026 tại ba địa điểm tạm thời — một văn phòng mới tại Atlanta, Văn Phòng Thực Địa Atlanta, và Văn Phòng Thực Địa Montgomery, Alabama. Văn phòng thường trực dự kiến sẽ hoạt động vào năm 2027.",
    "about.badge": "LLC Chính Thức<br>Có Giấy Phép & Bảo Hiểm",
    "about.tag": "Tại Sao Chọn Chúng Tôi",
    "about.title": 'Đồng Hành Cùng Bạn<br>Trên Mọi <em>Hành Trình</em>',
    "about.p1": "FutureSteps Services ra đời với sứ mệnh rõ ràng: giúp gia đình Việt Nam tiếp cận giáo dục quốc tế, cơ hội việc làm và trải nghiệm du lịch một cách dễ dàng và an tâm nhất. Chúng tôi thấu hiểu những lo lắng khi làm hồ sơ visa, chọn trường cho con hay lên kế hoạch chuyến đi quan trọng.",
    "about.p2": "Là công ty LLC có giấy phép tại Texas, chúng tôi tự hào mang đến dịch vụ tư vấn 1-1 tận tâm — điều mà các công ty lớn không thể có được. Chúng tôi sẵn sàng gặp bạn tại văn phòng, nhà riêng, hoặc bất cứ đâu thuận tiện cho bạn.",
    "about.story": "Tôi đến Mỹ với tư cách một du học sinh và đã tự mình trải qua mọi cột mốc quan trọng — từ xin I-20, chuyển trường, hoàn thành bằng thạc sĩ, trải qua OPT, STEM OPT và CPT, đến được bảo lãnh diện EB-2 và cuối cùng là nhận thẻ xanh.",
    "about.story.by": "— Người Sáng Lập, FutureSteps",
    "about.f1.title": "Tư Vấn Tận Tâm",
    "about.f1.desc": "Mỗi khách hàng được tư vấn riêng, phù hợp hoàn cảnh và mục tiêu cụ thể",
    "about.f2.title": "Linh Hoạt & Tiện Lợi",
    "about.f2.desc": "Hẹn gặp tại nhà, văn phòng hoặc online — theo lịch trình của bạn",
    "about.f3.title": "Chi Phí Rõ Ràng",
    "about.f3.desc": "Báo giá minh bạch từ đầu — không phát sinh, không phí ẩn",
    "proc.tag": "Quy Trình Làm Việc",
    "proc.title": 'Chỉ 4 Bước <em>Đơn Giản</em>',
    "proc.desc": "Từ cuộc gọi đầu tiên đến ngày khởi hành — mọi thứ đều được chúng tôi lo liệu chu đáo.",
    "proc.s1.title": "Tư Vấn Miễn Phí",
    "proc.s1.desc": "Chia sẻ mong muốn của bạn — chúng tôi sẽ đánh giá tình hình và đề xuất phương án tối ưu nhất. Hoàn toàn miễn phí, không ràng buộc.",
    "proc.s2.title": "Chuẩn Bị Hồ Sơ",
    "proc.s2.desc": "Đội ngũ chuyên gia thu thập, kiểm tra và hoàn thiện toàn bộ giấy tờ. Mọi chi tiết đều được rà soát kỹ lưỡng trước khi nộp.",
    "proc.s3.title": "Nộp Hồ Sơ & Theo Sát",
    "proc.s3.desc": "Chúng tôi thay mặt bạn nộp hồ sơ và theo dõi sát sao tiến trình, cập nhật kết quả nhanh chóng qua điện thoại hoặc Zalo.",
    "proc.s4.title": "Chúc Mừng — Lên Đường!",
    "proc.s4.desc": "Visa được duyệt, vé máy bay đã đặt, mọi thứ sẵn sàng! Chúng tôi hỗ trợ đến phút cuối — từ đón sân bay đến hướng dẫn ban đầu tại nơi đến.",
    "cta.title": "Bạn Đã Sẵn Sàng Cho Hành Trình Mới?",
    "cta.desc": "Đặt lịch tư vấn miễn phí ngay hôm nay — không ràng buộc, không áp lực. Chỉ cần một cuộc gọi, chúng tôi sẽ giúp bạn tìm ra hướng đi tốt nhất.",
    "cta.btn": 'Đặt Lịch Tư Vấn Ngay <i class="fa-solid fa-arrow-right"></i>',
    "nav.prep": "Luyện Phỏng Vấn",
    "prepbanner.tag": "Công Cụ Luyện Tập Miễn Phí",
    "prepbanner.title": "Luyện Phỏng Vấn Di Trú — Miễn Phí",
    "prepbanner.desc": "Luyện tập với các câu hỏi thật mà viên chức thường hỏi cho phỏng vấn thẻ xanh diện hôn nhân, thi quốc tịch (dân sự &amp; tiếng Anh), tị nạn, visa du học F-1, và visa du lịch B1/B2 — song ngữ Anh/Tiếng Việt, trên mọi thiết bị. Do Future Steps xây dựng để giúp bạn tự tin bước vào buổi phỏng vấn.",
    "prepbanner.btn": 'Bắt Đầu Luyện Tập Miễn Phí <i class="fa-solid fa-arrow-right"></i>',
    "contact.tag": "Liên Hệ Ngay",
    "contact.title": 'Hãy Để Chúng Tôi<br>Giúp Bạn <em>Bắt Đầu</em>',
    "contact.desc": "Bạn có câu hỏi hoặc muốn tìm hiểu thêm? Hãy liên hệ — chúng tôi luôn sẵn lòng hỗ trợ và phản hồi trong vòng 24 giờ.",
    "contact.phone": "Hotline Tư Vấn",
    "contact.office": "Văn Phòng Chính",
    "contact.hours": "Giờ Làm Việc",
    "contact.hours.val": "7:00 sáng – 12:00 trưa (Giờ Việt Nam, GMT+7)",
    "form.heading": "Gửi Yêu Cầu Tư Vấn",
    "form.name": "Họ Và Tên",
    "form.name.ph": "Nhập họ và tên của bạn",
    "form.phone": "Số Điện Thoại",
    "form.email.ph": "email@example.com",
    "form.service": "Dịch Vụ Bạn Cần",
    "form.service.ph": "— Chọn dịch vụ —",
    "form.service.visa": "Dịch Vụ Visa",
    "form.service.study": "Tư Vấn Du Học",
    "form.service.travel": "Thiết Kế Chuyến Đi",
    "form.service.other": "Dịch Vụ Khác / Chưa Xác Định",
    "form.message": 'Nội Dung Yêu Cầu <span class="word-limit" id="wordCount">(0 / 350 từ)</span>',
    "form.message.ph": "Vui lòng mô tả nhu cầu của bạn — chúng tôi sẽ liên hệ tư vấn chi tiết...",
    "form.submit": 'Gửi Yêu Cầu <i class="fa-solid fa-paper-plane"></i>',
    "form.note": "Chúng tôi cam kết phản hồi trong 24 giờ. Mọi thông tin được bảo mật tuyệt đối.",
    "prep.title": "Chuẩn bị cho buổi phỏng vấn visa? 🎤",
    "prep.desc": "Luyện tập các câu hỏi phỏng vấn thực tế với công cụ miễn phí của chúng tôi — mọi lúc, theo nhịp độ của riêng bạn. Tự tin bước vào phòng phỏng vấn!",
    "prep.btn": 'Luyện Tập Cùng Chúng Tôi <i class="fa-solid fa-arrow-right"></i>',
    "form.success.prep": "🎤 Trong lúc chờ phản hồi — hãy chuẩn bị cho buổi phỏng vấn visa! Luyện tập câu hỏi thực tế với công cụ miễn phí của chúng tôi.",
    "form.success.prepbtn": 'Luyện Tập Ngay <i class="fa-solid fa-arrow-up-right-from-square"></i>',
    "form.success.title": "Gửi Thành Công!",
    "form.success.desc": "Cảm ơn bạn đã tin tưởng FutureSteps. Chúng tôi sẽ liên hệ lại trong vòng 24 giờ để tư vấn chi tiết.",
    "form.success.another": 'Gửi Yêu Cầu Khác <i class="fa-solid fa-rotate-right"></i>',
    "footer.desc": "FutureSteps Services — Đơn vị tư vấn du lịch, visa và du học uy tín tại Dallas, TX. Đối tác đáng tin cậy đồng hành cùng bạn trên mọi hành trình quốc tế.",
    "footer.services": "Dịch Vụ",
    "footer.company": "Về FutureSteps",
    "footer.contactinfo": "Liên Hệ",
    "footer.contact": "Liên Hệ",
  }
};

const enCache = {};
let currentLang = "en";

function switchLanguage(lang) {
  const flag = document.getElementById("langFlag");
  const label = document.getElementById("langLabel");

  if (lang === "vi") {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (!enCache[key]) enCache[key] = el.innerHTML;
      if (translations.vi[key]) el.innerHTML = translations.vi[key];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
      const key = el.getAttribute("data-i18n-ph");
      if (!enCache["ph:" + key]) enCache["ph:" + key] = el.placeholder;
      if (translations.vi[key]) el.placeholder = translations.vi[key];
    });
    flag.textContent = "🇺🇸";
    label.textContent = "English";
    document.documentElement.lang = "vi";
    currentLang = "vi";
  } else {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (enCache[key]) el.innerHTML = enCache[key];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
      const key = el.getAttribute("data-i18n-ph");
      if (enCache["ph:" + key]) el.placeholder = enCache["ph:" + key];
    });
    flag.textContent = "🇻🇳";
    label.textContent = "Tiếng Việt";
    document.documentElement.lang = "en";
    currentLang = "en";
  }
  updateWordCount();
}


document.addEventListener("DOMContentLoaded", () => {

  tagPracticeLinksWithAnonId();

  /* ── Language toggle ── */
  document.getElementById("langToggle").addEventListener("click", () => {
    switchLanguage(currentLang === "en" ? "vi" : "en");
  });

  /* ── Word count for message textarea ── */
  const msgTextarea = document.getElementById("message");
  const WORD_LIMIT = 350;

  window.updateWordCount = function() {
    /* Re-query each time: switching language replaces the label's
       innerHTML, which recreates the #wordCount span */
    const wordCountEl = document.getElementById("wordCount");
    if (!msgTextarea || !wordCountEl) return;
    const text = msgTextarea.value.trim();
    const count = text === "" ? 0 : text.split(/\s+/).length;
    const unit = currentLang === "vi" ? "từ" : "words";
    wordCountEl.textContent = `(${count} / ${WORD_LIMIT} ${unit})`;
    wordCountEl.classList.toggle("over", count > WORD_LIMIT);
  };

  if (msgTextarea) {
    msgTextarea.addEventListener("input", () => {
      const text = msgTextarea.value.trim();
      const count = text === "" ? 0 : text.split(/\s+/).length;
      if (count > WORD_LIMIT) {
        const words = text.split(/\s+/).slice(0, WORD_LIMIT);
        msgTextarea.value = words.join(" ");
      }
      updateWordCount();
    });
  }

  /* ── Navbar scroll effect ── */
  const nav = document.getElementById("nav");
  const handleScroll = () => {
    nav.classList.toggle("nav--scrolled", window.scrollY > 60);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* ── Mobile hamburger menu ── */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
    document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  /* ── Scroll-triggered animations ── */
  const animatedEls = document.querySelectorAll("[data-animate]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.delay || "0", 10);
        setTimeout(() => entry.target.classList.add("visible"), delay);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  animatedEls.forEach(el => observer.observe(el));

  /* ── Counting animation for hero stats ── */
  const statNums = document.querySelectorAll("[data-count]");
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 2000;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  statNums.forEach(el => countObserver.observe(el));

  /* ── Active nav link highlighting ── */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = navLinks.querySelectorAll("a[href^='#']");
  const highlightNav = () => {
    let current = "";
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", highlightNav, { passive: true });

  /* ── Contact form — Netlify Forms submission ── */
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = form.querySelector("button[type='submit']");
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ' + (currentLang === "vi" ? "Đang gửi…" : "Sending…");
    btn.disabled = true;

    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
    .then(() => {
      form.hidden = true;
      success.hidden = false;
      success.style.display = "flex";
    })
    .catch(() => {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
      alert("Something went wrong. Please try again or email us directly.");
    });
  });

  /* ── Send Another Message button ── */
  document.getElementById("sendAnother").addEventListener("click", () => {
    form.reset();
    form.hidden = false;
    success.hidden = true;
    success.style.display = "none";
    const btn = form.querySelector("button[type='submit']");
    const submitKey = currentLang === "vi" ? translations.vi["form.submit"] : 'Send Message <i class="fa-solid fa-paper-plane"></i>';
    btn.innerHTML = submitKey;
    btn.disabled = false;
    updateWordCount();
  });

  /* ── Smooth scroll for all anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

});
