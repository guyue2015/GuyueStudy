set docDemoPath=Y:\git\guyueStudy\doc\guyuebattools\docDemo\designdemo.docx
set docName=%1%
copy %docDemoPath% .
ren designdemo.docx %docName%.docx
exit