Đã setup xong frontend với backend, chưa setup MSSQL với Spring Security (authentication)  
Để chạy project, mn cần  
- Mở project Spring Boot trong folder `/backend` (khuyến khích mn xin Intellij Education về xài, nó tự tải mấy cái dependency) và run project, nếu thành công thì mở trang http://localhost:8080/api/v1/demo sẽ có file json HelloWorld  
- Mở project web trong folder `/frontend` (khuyến khích xài vscode), chạy `npm install` rồi chạy `npm run dev` để setup và chạy project, nếu thành công thì mở trang http://localhost:5173/about sẽ hiện dòng HelloWorld
<details>
<summary>Spring Boot Config:</summary>
https://start.spring.io/#!type=maven-project&language=java&platformVersion=3.2.5&packaging=jar&jvmVersion=21&groupId=db.webapp&artifactId=backend&name=backend&description=Demo%20backend%20for%20DB%20assignment&packageName=db.webapp.backend&dependencies=lombok,devtools,web,security,data-jpa,sqlserver
</details>
