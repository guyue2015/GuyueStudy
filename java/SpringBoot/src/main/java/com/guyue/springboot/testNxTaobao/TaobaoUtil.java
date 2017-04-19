package com.guyue.springboot.testNxTaobao;

import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.guyue.common.util.FileUtil;
import com.guyue.common.util.GuyueStringBuffer;
import com.guyue.common.util.PrintUtil;
import com.guyue.common.util.StringUtil;
import com.guyue.common.util.office.ExcelUtil;
import com.guyue.springboot.testNxTaobao.bean.TitleFileBean;

public class TaobaoUtil {
	public static List<TreeMap<Integer, String>> resultMapList = new ArrayList<TreeMap<Integer, String>>(); 
	public static List<TreeMap<Integer,String>> titlesMapList = new ArrayList<>();
	public static List<TitleFileBean> titleFileList = new ArrayList<TitleFileBean>();
	public static TreeMap<String, Map<Integer,String>> codeTemple = new TreeMap<String, Map<Integer,String>>();
	public static Map<String,Integer> codeOrder = new HashMap<String, Integer>();
	/**
	 * 
	 * @param titleFileDirectory 标题文件目录
	 * @param titleFile 标题文件
	 * @param taobaoHelpFile 淘宝助手文件
	 * @param resultFilePath 生成文件目录
	 * @return 生成文件路径
	 */
	public static String createTaobaoFile(Path titleFileDirectory,
			Path titleFile, Path taobaoHelpFile, Path resultFilePath) {
		clearData();
		List<Path> titlesPaths = new ArrayList<Path>();
		FileUtil.getSubPathByEnd(titleFileDirectory, titlesPaths,"xls");
		for(Path titlePath:titlesPaths){
			TitleFileBean titleBean = new TitleFileBean();
			titleBean.setName(titlePath.getFileName().toString().replace(".xls", ""));
			List<String> titles = new ArrayList<String>();
			Map<Integer, List> taobleExcelMap = ExcelUtil.readExcel(titlePath);
			List<Map<Integer,String>> list = taobleExcelMap.get(0);
			for(Map<Integer,String> temp:list){
				titles.add(temp.get(0));
			}
			titleBean.setTitles(titles);
			titleFileList.add(titleBean);
		}
		Map<Integer, List> taobleExcelMap = ExcelUtil.readExcel(taobaoHelpFile);
		List<Map<Integer,String>> sheet0 = taobleExcelMap.get(0);
		for(int i=0;i<sheet0.size();i++){
			if(i==0 || i==1|| i==2){
				TreeMap<Integer,String> map = new TreeMap<Integer,String>();
				 map.putAll(sheet0.get(i));
				titlesMapList.add(map);
			}else{
				Map<Integer, String> map = sheet0.get(i);
				map.remove(0);
				codeTemple.put(map.get(1),map);
				codeOrder.put(map.get(1), codeOrder.size()+1);
			}
		}
		Map<Integer, List> titleAndCodeMap = ExcelUtil.readExcel(titleFile);
		List<Map<Integer,String>> titleAndCodeSheet0 = titleAndCodeMap.get(0);
		for(Map<Integer,String> map:titleAndCodeSheet0){
			String name = map.get(2);
			if(StringUtil.isEmpty(name)||!name.matches("^.*[_]{1}.*[-].*$")){
				continue;
			}else{
				for(TitleFileBean bean:titleFileList){
					if(bean.getName().equals(name)){
						bean.setCode(map.get(1));
						bean.setOrder(codeOrder.get(map.get(1)));
						bean.setExcelContextTemple(codeTemple.get(map.get(1)));
					}
				}
			}
		}
		Collections.sort(titleFileList);
		for(TitleFileBean bean:titleFileList){
			for(String title:bean.getTitles()){
				TreeMap<Integer, String> resultMap = new TreeMap<Integer, String>();
				resultMap.put(0, title);
				resultMap.putAll(bean.getExcelContextTemple());
				resultMapList.add(resultMap);
			}
		}
		titlesMapList.addAll(resultMapList);
		GuyueStringBuffer sb = new GuyueStringBuffer();
		FileUtil.deleteFile(resultFilePath);
		FileUtil.createFile(resultFilePath);
		for(int i=0;i<titlesMapList.size();i++){
			TreeMap<Integer, String> rowMap = titlesMapList.get(i);
			for(Integer key:rowMap.keySet()){
				sb.append(rowMap.get(key));
				sb.append("\t");
			}
			sb.appendln("");
		}
//		FileUtil.writeFile(resultFilePath, sb.toString());
		try {
			FileUtil.writeFile(resultFilePath, new String(sb.toString().getBytes(),Charset.forName("UTF-8")));
		} catch (Exception e) {
			e.printStackTrace();
		}
//		ExcelUtil.writeExcel(resultFilePath,titlesMapList);
		return null;
	}
	private static void clearData() {
		resultMapList.clear();
		titleFileList.clear();
		codeTemple.clear();
		codeOrder.clear();
	}
}
