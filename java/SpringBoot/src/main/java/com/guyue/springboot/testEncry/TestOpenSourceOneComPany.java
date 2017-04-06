package com.guyue.springboot.testEncry;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

public class TestOpenSourceOneComPany {
	private static TreeMap<String,String> allData = new TreeMap<String, String>();
	public static void main(String[] args) {
		initData();
		for(String key:allData.keySet()){
			System.out.println(key+"=="+allData.get(key).trim());
		}
	}

	private static void initData() {
		Map<String,Map<String,String>> encryMap = new HashMap<String,Map<String,String>>();
		Map<String,String> dataMap1 = new TreeMap<String, String>();
		dataMap1.put("17050193","79005200200041004100400067003000");
		dataMap1.put("10293185","72005200240043004100430069002F00");
		dataMap1.put("10377476","7200520022004400440047006A002E00");
		dataMap1.put("3682637","780054007B0049004300460054002E00");
		dataMap1.put("18556396","7A00520020004600430046006A003000");
		dataMap1.put("13688670","75005200230047004600480064002E00");
		dataMap1.put("13703202","7300520022004A004300460064002A00");
		dataMap1.put("17919611","790052007A004A004600490065002800");
		dataMap1.put("10217757","720052007A004300470047006B002C00");
		dataMap1.put("15940659","770052007D004A00460040006D002C00");
		dataMap1.put("14007630","76005200790041004600470064002A0021006100");
		dataMap1.put("13461059","760052007B004100440041006B002E0021006100");
		dataMap1.put("12988809","7400520023004A00480048006D00270021006100");
		dataMap1.put("15891434","77005200240049004400410068002A0021006100");
		dataMap1.put("17032887","790052007C004100480042006B002F0021006100");
		encryMap.put("ttm01",dataMap1);
		Map<String,String> dataMap2 = new TreeMap<String, String>();
		dataMap2.put("11564527","7300520021004600450044006B002900");
		dataMap2.put("1166317","73005200210047004100430054002E00");
		dataMap2.put("18365574","740052007A0043004600440064002C00");
		dataMap2.put("16320944","780052007B0044004900400068002B00");
		dataMap2.put("17176561","79005200220042004500460065002D00");
		dataMap2.put("15969618","7700520021004A00460049006C002800");
		dataMap2.put("18488273","7A005200230045004200480067002E00");
		dataMap2.put("16044496","780052007D004100440044006A003000");
		dataMap2.put("16112190","780052007A0042004100420064003000");
		dataMap2.put("18587882","7A005200230046004800470066002F00");
		dataMap2.put("17428199","790052007B0045004100480067002E0021006100");
		dataMap2.put("18690895","7A00520024004700480040006900300021006100");
		dataMap2.put("16123216","780052007B004200420043006A00280021006100");
		dataMap2.put("14172637","7A00520024004A00410040006B002D0021006100");
		dataMap2.put("15232579","770052007C004300450042006D002E0021006100");
		encryMap.put("ttm02",dataMap2);
		Map<String,String> dataMap3 = new TreeMap<String, String>();
		dataMap3.put("10149435","720052007D0042004400490069002A00");
		dataMap3.put("16502891","78005200790046004800420065003000");
		dataMap3.put("10233379","720052007C004300430043006D002E00");
		dataMap3.put("10348004","720052007D0044004000480068002700");
		dataMap3.put("10365040","72005200210044004000450064002B00");
		dataMap3.put("10366189","7200520021004400410046006D002F00");
		dataMap3.put("15710035","770052007A0048004000400069002A00");
		dataMap3.put("10245772","720052007D0043004700450066002E00");
		dataMap3.put("15595773","77005200240046004700450067002E00");
		dataMap3.put("17155106","7900520020004200410045006A002700");
		dataMap3.put("16831179","780052007C004900410041006D002E0021006100");
		dataMap3.put("18648521","7A0052007D004700450048006500290021006100");
		dataMap3.put("17086219","7900520023004100420046006D00280021006100");
		dataMap3.put("15435317","770052007C004500430045006B00280021006100");
		dataMap3.put("16776458","7800520022004800440046006C002C0021006100");
		encryMap.put("ttm03",dataMap3);
		Map<String,String> dataMap4 = new TreeMap<String, String>();
		dataMap4.put("10420054","720052007B0045004000400068002C00");
		dataMap4.put("18508889","7A00520079004600480048006D002F00");
		dataMap4.put("16972264","7800520022004A004200420068002D00");
		dataMap4.put("17009662","79005200790041004600490066002D00");
		dataMap4.put("17059374","79005200200041004300490068002E00");
		dataMap4.put("17683232","79005200230047004200430066002A00");
		dataMap4.put("14751914","76005200200048004900410068002800");
		dataMap4.put("3589013","77005400240049004100400054002A00");
		dataMap4.put("17478754","79005200220045004700480068002C00");
		dataMap4.put("17233648","7900520023004300470040006B002800");
		dataMap4.put("18284654","7A005200230043004600440068002C0021006100");
		dataMap4.put("15435951","770052007C0045004900450065002C0021006100");
		dataMap4.put("16839460","780052007C0049004400490064002D0021006100");
		dataMap4.put("18663209","7A00520021004700420043006D00270021006100");
		dataMap4.put("18246695","7A0052007D004300460046006900300021006100");
		encryMap.put("ttm04",dataMap4);
		Map<String,String> dataMap5 = new TreeMap<String, String>();
		dataMap5.put("10097680","72005200240041004600470064002F00");
		dataMap5.put("10131506","720052007C004200450041006A002700");
		dataMap5.put("10741669","770052007A0041004400400065002C00");
		dataMap5.put("16713877","7B005200240046004600490069002A00");
		dataMap5.put("13907633","7500520079004A004600470067002A00");
		dataMap5.put("16160955","78005200210042004900400069002C00");
		dataMap5.put("16170972","78005200220042004900400066002E00");
		dataMap5.put("16899814","78005200240049004800490068002800");
		dataMap5.put("14380652","76005200230044004600400066002C00");
		dataMap5.put("14025622","760052007B0041004600450066002900");
		encryMap.put("ttm05",dataMap5);
		Map<String,String> dataMap6 = new TreeMap<String, String>();
		dataMap6.put("14806216","7600520079004900420046006A002800");
		dataMap6.put("16840209","780052007D004900420040006D002700");
		dataMap6.put("18137224","7A0052007C0042004200470068002900");
		dataMap6.put("18617143","7A0052007A0047004100470067002B00");
		dataMap6.put("18623172","7A0052007B0047004100430066002E00");
		dataMap6.put("17689290","79005200230047004200490064003000");
		dataMap6.put("3385833","75005400200049004300480054002A00");
		dataMap6.put("14590292","76005200240046004200400066003000");
		dataMap6.put("17575394","79005200220046004300450068003000");
		dataMap6.put("17690549","7900520024004700450040006D002B00");
		encryMap.put("ttm06",dataMap6);
		Map<String,String> dataMap7 = new TreeMap<String, String>();
		dataMap7.put("10224680","720052007B0043004600440064002F00");
		dataMap7.put("16231093","780052007C0043004100410065002C00");
		dataMap7.put("16071430","78005200220041004400410064002A00");
		dataMap7.put("14710636","760052007A004800460040006A002A00");
		dataMap7.put("18539623","7A0052007C0046004600490067002900");
		dataMap7.put("15461857","7700520021004500480041006B002C00");
		dataMap7.put("15976598","7700520022004A00450046006C003000");
		dataMap7.put("11333265","730052007C0044004200430069002D00");
		dataMap7.put("15947354","770052007D004A004300470068002C00");
		dataMap7.put("159503","	7700520020004A0043004000");
		encryMap.put("ttm07",dataMap7);
		Map<String,String> dataMap8 = new TreeMap<String, String>();
		dataMap8.put("16279982","78005200220043004900490066002F00");
		dataMap8.put("16159609","7800520020004200460049006D002700");
		dataMap8.put("16159905","78005200200042004900490069002700");
		dataMap8.put("16160125","78005200210042004100400069002900");
		dataMap8.put("3371463","750054007A0048004600440054002A00");
		dataMap8.put("17110907","790052007A004200490040006B002700");
		dataMap8.put("16187975","78005200230042004900470069002E00");
		dataMap8.put("18479666","7A00520022004500460049006A002D00");
		dataMap8.put("16858191","78005200200049004100480065003000");
		dataMap8.put("16160727","7800520021004200470040006B002900");
		encryMap.put("ttm08",dataMap8);
		Map<String,String> dataMap9 = new TreeMap<String, String>();
		dataMap9.put("18362025","7A00520021004400400042006D00270021006100");
		dataMap9.put("18679531","7A005200220047004500490065002A00");
		dataMap9.put("18362480","7A005200210044004400420064002F00");
		dataMap9.put("15181756","7700520023004200470041006A002C00");
		dataMap9.put("18188323","7A005200230042004300480067002900");
		dataMap9.put("10018678","720052007A004100460048006C002E00");
		dataMap9.put("18491627","7A00520024004500460041006B002900");
		dataMap9.put("18586649","7A00520023004600460046006D002B00");
		dataMap9.put("18426288","7A0052007B004500420046006C002F00");
		dataMap9.put("1018168","72005200230042004600410054002F00");
		encryMap.put("ttm09",dataMap9);
		Map<String,String> dataMap10 = new TreeMap<String, String>();
		dataMap10.put("17472931","79005200220045004900420065002A00");
		dataMap10.put("17526726","790052007B004600470046006A002900");
		dataMap10.put("18149782","7A0052007D0042004700490066002F00");
		dataMap10.put("18395105","7A005200240044004100450069002700");
		dataMap10.put("15377781","77005200220044004700470065002F00");
		dataMap10.put("18565271","7A005200210046004200450065002E00");
		dataMap10.put("10175460","72005200220042004400450064002D00");
		dataMap10.put("18556297","7A00520020004600420046006B003000");
		dataMap10.put("162299","780052007B00430049004900");
		dataMap10.put("18597665","7A005200240046004600470069002D00");
		encryMap.put("ttm10",dataMap10);
		Map<String,String> dataMap11 = new TreeMap<String, String>();
		dataMap11.put("17608247","7900520079004700420048006B002B00");
		dataMap11.put("17710713","790052007A0048004700400067002800");
		dataMap11.put("10650982","72005200200047004900400066002F00");
		dataMap11.put("15423549","770052007B004500450043006D002B00");
		dataMap11.put("18476694","7A005200220045004600460068003000");
		dataMap11.put("14402266","7600520079004500420042006A002D00");
		dataMap11.put("14463672","76005200210045004600430066002E00");
		dataMap11.put("18081909","7A00520023004100490041006D002700");
		dataMap11.put("15800627","7700520079004900460040006B002900");
		dataMap11.put("15800918","7700520079004900490040006C002800");
		encryMap.put("ttm11",dataMap11);
		Map<String,String> dataMap12 = new TreeMap<String, String>();
		dataMap12.put("18217772","7A0052007A0043004700470066002E00");
		dataMap12.put("8243290","72005200210047004700440054002F00");
		dataMap12.put("17921189","790052007B004A00410041006D002F00");
		dataMap12.put("17761951","79005200210048004900410065002C00");
		dataMap12.put("17841548","790052007D004900450041006C002B00");
		dataMap12.put("18374794","7A005200220044004700440068003000");
		dataMap12.put("18391155","7A005200240044004100410069002C00");
		dataMap12.put("16139912","780052007C0042004900490066002800");
		dataMap12.put("316488","730054007D00470048004800");
		dataMap12.put("15325832","770052007B0044004800450066002A00");
		encryMap.put("ttm12",dataMap12);
		for(String key:encryMap.keySet()){
			Map<String,String> data = encryMap.get(key);
			for(String datakey:data.keySet()){
				allData.put(datakey, data.get(datakey));
			}
		}
	}
}