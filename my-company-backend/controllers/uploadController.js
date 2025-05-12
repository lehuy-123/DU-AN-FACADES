exports.uploadImage = (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Không có file được tải lên' });
    }
  
    const filePath = `/uploads/${req.file.filename}`; // Đường dẫn public
  
    res.json({
      message: 'Upload thành công',
      url: filePath, // frontend sẽ dùng url này để gắn vào markdown
    });
  };
  