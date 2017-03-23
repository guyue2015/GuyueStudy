package com.guyue.springboot.testVeryCode;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;

public class TestReadVeryCodeImage {
	public static void main(String[] args) {
		String imagepath = "E:\\guyue\\projectFile\\generalFile\\testVeryCode.jpg";
		try {
			byte[] readAllBytes = Files.readAllBytes(FileSystems.getDefault().getPath(imagepath));
			for(int i=0;i<readAllBytes.length;i++){
				System.out.println("d.push(["+i+","+readAllBytes[i]+"]);");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
}
