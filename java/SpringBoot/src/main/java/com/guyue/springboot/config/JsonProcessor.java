//package com.creditpomelo.rc.mapi.config;
//
//import com.fasterxml.jackson.core.JsonGenerator;
//import com.fasterxml.jackson.core.JsonParser;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.DeserializationContext;
//import com.fasterxml.jackson.databind.JsonDeserializer;
//import com.fasterxml.jackson.databind.JsonSerializer;
//import com.fasterxml.jackson.databind.SerializerProvider;
//import org.springframework.boot.jackson.JsonComponent;
//
//import java.io.IOException;
//
///**
// * Created by sunxiaodong on 2017/4/14.
// */
//@JsonComponent
//public class JsonProcessor {
//
//    public static class IntegerSerializer extends JsonSerializer<Integer>{
//
//        @Override
//        public void serialize(Integer integer, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
//            if (integer == -1) {
//                jsonGenerator.writeNull();
//            } else {
//                jsonGenerator.writeNumber(integer);
//            }
//        }
//    }
//
//    public static class StringSerializer extends JsonSerializer<String>{
//
//        @Override
//        public void serialize(String s, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
//            if(s.equals("0")) {
//                jsonGenerator.writeString("100");
//            } else {
//                jsonGenerator.writeString(s);
//            }
//        }
//    }
//
//    public static class StringDeserializer extends JsonDeserializer<String> {
//        @Override
//        public String deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
//            return null;
//        }
//    }
//}
