package com.guyue.springboot.testMongoDb;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.*;

public class TestMongoDB {
	public static void main(String[] args) {
//		MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://192.168.15.75:27017"));
//		MongoDatabase database = mongoClient.getDatabase("test");
//		database.getCollection("user").drop();
//		database.createCollection("user");
//		List<Document> userDocList = new ArrayList<Document>();
//		Student student=null;
//		for(int i=0;i<10;i++){
//			student = new Student();
//			student.set_id(i);
//			student.setCompany("公司"+i);
//			student.setAge("年龄"+i);
//			student.setHomeAddress("家庭地址"+i);
//			student.setName("姓名"+i);
//			userDocList.add(Document.parse(new Gson().toJson(student)));
//		}
//		database.getCollection("user").insertMany(userDocList);
//		FindIterable<Document> findList = database.getCollection("user").find(ne("_id", 5));
//		for(Document doc:findList){
//			System.out.println(doc.size());
//			System.out.println(doc.toJson());
////			System.out.println(doc.get(doc., Student.class));
//		}
	}
}
class Student{
	int _id;
	String name;
	String age;
	String company;
	String homeAddress;
	
	public int get_id() {
		return _id;
	}
	public void set_id(int _id) {
		this._id = _id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getHomeAddress() {
		return homeAddress;
	}
	public void setHomeAddress(String homeAddress) {
		this.homeAddress = homeAddress;
	}
}
