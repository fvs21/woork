package org.woork.backend.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.springframework.util.ResourceUtils;

import java.io.*;
import java.util.HashMap;

public class JsonUtils {
    public static String readFile(String dir) {
        try {
            File file = ResourceUtils.getFile("classpath:" + dir);
            InputStream inputStream = new FileInputStream(file);
            String content = new String(inputStream.readAllBytes());
            inputStream.close();
            return content;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static Object readJson(String json, Class<?> c) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(json, c);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
