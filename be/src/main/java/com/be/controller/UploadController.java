package com.be.controller;

import com.be.model.ResponseData;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    private final Path resourcePath = Paths.get("upload");

//    @PostMapping("image")
//    public ResponseEntity<ResponseData> upload(MultipartHttpServletRequest multiRequest) {
//        ResponseData responseData = new ResponseData();
//        Map<String, MultipartFile> files = multiRequest.getFileMap();
//        List<MultipartFile> list = new ArrayList<>(files.values());
//        List<String> savedFilePaths = new ArrayList<>();
//
//        try {
//            if (!list.isEmpty()) {
//                for (MultipartFile item : list) {
//                    if (item.getSize() > 0) {
//                        String fileName = System.currentTimeMillis() + "_" + item.getOriginalFilename(); // Tạo tên file duy nhất
//                        Path targetLocation = resourcePath.resolve(fileName); // Đường dẫn lưu file
//                        Files.copy(item.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING); // Lưu file
//
//                        savedFilePaths.add(targetLocation.toString()); // Lưu đường dẫn file
//                    }
//                }
//                responseData.setResponseData(savedFilePaths); // Trả về danh sách đường dẫn file đã lưu
//            }
//            responseData.setStatus(true);
//        } catch (Exception e) {
//            e.printStackTrace();
//            responseData.setMessage("Save failed!");
//            responseData.setStatus(false);
//        }
//        return ResponseEntity.ok(responseData);
//    }

    @PostMapping("image")
    public ResponseEntity<ResponseData> upload(MultipartHttpServletRequest multiRequest) {
        ResponseData responseData = new ResponseData();
        Map<String, MultipartFile> files = multiRequest.getFileMap();
        List<MultipartFile> list = new ArrayList<>(files.values());
        List<String> savedFilePaths = new ArrayList<>();

        try {
            // Kiểm tra và tạo thư mục nếu chưa tồn tại
            if (!Files.exists(resourcePath)) {
                Files.createDirectories(resourcePath);
            }

            if (!list.isEmpty()) {
                for (MultipartFile item : list) {
                    if (item.getSize() > 0) {
                        String extension = getFileExtension(item.getOriginalFilename());
                        String fileName = UUID.randomUUID().toString().substring(0, 8) + extension;
//                        String fileName = System.currentTimeMillis() + "_" + item.getOriginalFilename();
                        Path targetLocation = resourcePath.resolve(fileName);
                        Files.copy(item.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

//                        savedFilePaths.add(targetLocation.toString());
                        savedFilePaths.add(fileName);

                    }
                }
                responseData.setResponseData(savedFilePaths);
            }
            responseData.setStatus(true);
        } catch (Exception e) {
            e.printStackTrace();
            responseData.setMessage("Save failed!");
            responseData.setStatus(false);
        }
        return ResponseEntity.ok(responseData);
    }

    private String getFileExtension(String fileName) {
        int lastIndexOfDot = fileName.lastIndexOf('.');
        return (lastIndexOfDot != -1) ? fileName.substring(lastIndexOfDot) : "";
    }

    private final Path fileStorageLocation = Paths.get("upload").toAbsolutePath().normalize();

    // Endpoint để truy xuất file ảnh
    @GetMapping("/image/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            Path filePath = fileStorageLocation.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
