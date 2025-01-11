package com.be.controller;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.net.MalformedURLException;

@RestController
@RequestMapping("/api/files")
public class FileController {
    private final Path fileStorageLocation = Paths.get("upload").toAbsolutePath().normalize();

    // Endpoint để truy xuất file ảnh
    @GetMapping("/image/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            // Tạo đường dẫn đầy đủ đến file
            Path filePath = fileStorageLocation.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri()); // Truy xuất file ảnh bằng UrlResource

            // Kiểm tra nếu file tồn tại
            if (resource.exists()) {
                // Trả về file với header để trình duyệt biết là tài nguyên có thể hiển thị
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build(); // Trả về 404 nếu file không tồn tại
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build(); // Trả về lỗi nếu có exception
        }
    }
}
