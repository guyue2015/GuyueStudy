package com.guyue.springboot.testNxTaobao;

import com.guyue.common.util.FileUtil;

/**
 * 测试淘宝数据合成，也就是倪雪说的数据分裂
 * @author Administrator
 *
 */
public class TestCreateTabaoData {
	/**
	 * 标题栏目录O
	 */
	public static String titleFileDirectory="D:/迅雷下载/倪雪淘宝/小奈、4.5/标题栏/";
	/**
	 * 标题栏文件目录
	 */
	public static String titleFile="D:/迅雷下载/倪雪淘宝/小奈、4.5/NX.xls";
	/**
	 * 淘宝助理文件目录
	 */
	public static String taobaoHelpFile="D:/迅雷下载/倪雪淘宝/小奈、4.5/淘宝助理5201704042156.xlsx";
	
	/**
	 * 生成文件目录
	 */
	public static String resultFilePath ="D:/迅雷下载/倪雪淘宝/小奈、4.5/分裂结果5201704042156.csv";
	
	public static void main(String[] args) {
		if(args!=null&&args.length==4){
			titleFileDirectory = args[0];
			titleFile = args[1];
			taobaoHelpFile = args[2];
			resultFilePath = args[3];
		}
		if(!titleFileDirectory.endsWith("/")){
			titleFileDirectory=titleFileDirectory+"/";
		}
		if(!FileUtil.exists(titleFileDirectory)){
			System.out.println("文件目录不存在:"+titleFileDirectory);
			return;
		}
		if(!FileUtil.exists(titleFile)){
			System.out.println("文件目录不存在:"+titleFile);
			return;
		}
		if(!FileUtil.exists(taobaoHelpFile)){
			System.out.println("文件目录不存在:"+taobaoHelpFile);
			return;
		}
		
		String resultFile = TaobaoUtil.createTaobaoFile(FileUtil.getPath(titleFileDirectory),FileUtil.getPath(titleFile),FileUtil.getPath(taobaoHelpFile),FileUtil.getPath(resultFilePath));
	}
}
