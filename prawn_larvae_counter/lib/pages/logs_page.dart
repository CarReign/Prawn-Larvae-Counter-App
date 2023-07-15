import 'package:flutter/material.dart';
import 'package:prawn_larvae_counter/main.dart';

class LogsPage extends StatefulWidget {
  const LogsPage({super.key});

  @override
  State<LogsPage> createState() => _LogsPageState();
}

class _LogsPageState extends State<LogsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.teal[50],
      appBar: AppBar(
        iconTheme: IconThemeData(
          color: Colors.teal[800],
          size: 35.0,
        ),
        backgroundColor: Colors.teal[50],
        title: Row(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.fromLTRB(0.0, 10.0, 10.0, 0),
              child: Text("LOGS",
                style: TextStyle(
                  fontFamily: 'Jomhuria',
                  color: Colors.teal[800],
                  fontSize: 50.0,
                ),
              ),
            ),
            Column(
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.fromLTRB(185.0, 0.0, 0.0, 0.0),
                  child: Text("10:11 am",
                    style: TextStyle(
                        color: Colors.teal[800],
                        fontSize: 15.0,
                        fontFamily: 'Inder'
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(170.0, 0.0, 0.0, 0.0),
                  child: Text("10/07/2023",
                    style: TextStyle(
                        color: Colors.teal[800],
                        fontSize: 15.0,
                        fontFamily: 'Inder'
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
      body: Column(
        children: <Widget>[
          Row(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.fromLTRB(20.0, 20.0, 0.0, 0.0),
                child: Column(
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0.0, 0.0, 190.0, 0.0),
                      child: Text("10:11 am",
                        style: TextStyle(
                            color: Colors.teal[800],
                            fontSize: 18.0,
                            fontFamily: 'Inder'
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0.0, 0.0, 170.0, 0.0),
                      child: Text("10/07/2023",
                        style: TextStyle(
                            color: Colors.teal[800],
                            fontSize: 18.0,
                            fontFamily: 'Inder'
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(0.0, 20.0, 0.0, 0.0),
                child: Column(
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 0.0),
                      child: Text("Prawn",
                        style: TextStyle(
                            color: Colors.teal[800],
                            fontSize: 18.0,
                            fontFamily: 'Inder'
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 0.0),
                      child: Text("Count:",
                        style: TextStyle(
                            color: Colors.teal[800],
                            fontSize: 18.0,
                            fontFamily: 'Inder'
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(10.0, 20.0, 0.0, 0.0),
                child: Column(
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 0.0),
                      child: Text("20",
                        style: TextStyle(
                          color: Colors.teal[800],
                          fontSize: 28.0,
                          fontFamily: 'Inder',
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          SizedBox(
            height: 10.0,
          ),
          Divider(
            thickness: 1.0,
            color: Colors.teal[100],
          ),
        ],
      ),
    );
  }
}