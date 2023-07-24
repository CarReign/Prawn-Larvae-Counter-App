import 'package:flutter/material.dart';


class WelcomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.0,
      ),
      body: Column(
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.fromLTRB(30.0, 20.0, 30.0, 0),
            child: Image.asset("assets/app logo.png"),
          ),
          const SizedBox(height: 80.0),
          GestureDetector(
            onTap: () {
              Navigator.pushNamed(context, '/signin');
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
                    'Sign In',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 22.0,
                      fontFamily: 'inter',
                    ),
                  )
              ),
            ),
          ),
          const SizedBox(height: 15.0),
          GestureDetector(
            onTap: () {
              Navigator.pushNamed(context, '/login');
            },
            child: Container(
              width: 300,
              height: 50,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(50),
                border: Border.all(
                  width: 1.0,
                  color: const Color(0xFF00796B),
                ),
                color: Colors.white,
              ),
              child: const Center(
                  child: Text(
                    'Log In',
                    style: TextStyle(
                      color: Color(0xFF00796B),
                      fontSize: 22.0,
                      fontFamily: 'inter',
                    ),
                  )
              ),
            ),
          ),
          const SizedBox(height: 180.0),
          Container(
            margin: const EdgeInsets.fromLTRB(25.0, 0.0, 25.0, 5.0),
            child: Column(
              children: [
                const Text(
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
    );
  }
}
