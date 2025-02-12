export const generateImageUrl = (imageName: string) => {
    // Kiểm tra xem process.env.REACT_APP_IMAGE_URL đã được định nghĩa chưa
    const baseUrl = process.env.REACT_APP_IMAGE_URL;
    
    if (!baseUrl) {
      throw new Error('REACT_APP_IMAGE_URL is not defined in the environment variables');
    }
  
    // Trả về đường dẫn ảnh hoàn chỉnh
    return `${baseUrl}${imageName}`;
  };