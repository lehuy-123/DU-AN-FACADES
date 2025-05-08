import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ họ tên, email và nội dung.' });
    }

    // Tạo transporter với Gmail
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'huy01082004@gmail.com',       
        pass: 'mharcgmmwloquubz' 
      }
    });

    // Cấu hình email
    let mailOptions = {
      from: email,                         
      to: 'huy01082004@gmail.com',          
      subject: `Liên hệ từ ${name}`,
      text: `Email: ${email}\nNội dung: ${message}`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('✅ Email sent');
      return res.status(200).json({ message: 'Cảm ơn bạn đã liên hệ! Email đã được gửi.' });
    } catch (error) {
      console.error('❌ Lỗi gửi email:', error);
      return res.status(500).json({ message: 'Đã xảy ra lỗi khi gửi email.' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
