package com.be.controller;

import com.be.model.ResponseData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

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

                        savedFilePaths.add(targetLocation.toString());
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

}
