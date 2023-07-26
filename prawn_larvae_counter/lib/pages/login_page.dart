import 'package:flutter/material.dart';

class LogInPage extends StatefulWidget {
  const LogInPage({Key? key}) : super(key: key);

  @override
  State<LogInPage> createState() => _LogInPage();
}

class _LogInPage extends State<LogInPage> {
  TextEditingController usernameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  static String login_username = '';
  static String login_password = '';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.teal[50],
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Colors.teal[50],
        elevation: 0.0,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.fromLTRB(50.0, 40.0, 50.0, 0),
              child: Image.asset("assets/app logo.png"),
            ),
            const SizedBox(height: 40.0),
            Container(
              width: 300,
              height: 45,
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.all(Radius.circular(50)),
              ),
              child: TextField(
                controller: usernameController,

                decoration: InputDecoration(
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(50)
                  ),
                  labelText: "Username",
                ),
              ),
            ),
            const SizedBox(height: 15.0),
            Container(
              width: 300,
              height: 45,
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.all(Radius.circular(50)),
              ),
              child: TextField(
                controller: passwordController,
                decoration: InputDecoration(
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(50)
                  ),
                  labelText: "Password",
                ),
              ),
            ),
            const SizedBox(height: 25.0),
            GestureDetector(
              onTap: () {
                Navigator.pushNamed(context, '/home');
                setState(() {
                  login_username = usernameController.text;
                  login_password = passwordController.text;
                });
              },
              child: Container(
                width: 300,
                height: 50,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(50),
                  color: Colors.teal[700],
                ),
                child: const Center(
                    child: Text(
                      'Log In',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 22.0,
                        fontFamily: 'Inder',
                      ),
                    )
                ),
              ),
            ),
            const SizedBox(height: 12.0),
            Text(
              "Doesn't have an account yet?",
              style: TextStyle(
                color: Colors.teal[300],
                fontSize: 18.0,
              ),
            ),
            const SizedBox(height: 0.0),
            TextButton(
              onPressed: () {
                Navigator.pushNamed(context, '/signin');
              },
              child: Text("Sign In",
                style: TextStyle(
                  height: -0.6,
                  color: Colors.teal[700],
                  fontSize: 18.0,
                  decoration: TextDecoration.underline,
                ),
              ),
            ),
            const SizedBox(height: 100.0),
            Container(
              margin: const EdgeInsets.fromLTRB(25.0, 0.0, 25.0, 25.0),
              child: const Column(
                children: [
                  Text(
                    "Copyright © 2024 Leonsarks",
                    style: TextStyle(
                      color: Color(0xFF00796B),
                      fontSize: 13.0,
                      fontFamily: 'Inder',
                    ),
                  ),
                  Text(
                    "All Rights Reserved",
                    style: TextStyle(
                      color: Color(0xFF00796B),
                      fontSize: 13.0,
                      fontFamily: 'Inder',
                    ),
                  ),
                ],
              ),
            ),

          ],
        ),
      ),
    );
  }
}
