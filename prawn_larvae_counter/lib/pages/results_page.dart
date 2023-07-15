import 'package:flutter/material.dart';
import 'package:prawn_larvae_counter/pages/home_page.dart';

class ResultsPage extends StatefulWidget {

  @override
  State<ResultsPage> createState() => _ResultsPageState();
}

class _ResultsPageState extends State<ResultsPage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.teal[50],
      appBar: AppBar(
        backgroundColor: Colors.teal[50],
        elevation: 0,
      ),
      body: Center(
        child: Column(
          children: <Widget>[
            Container(
              margin: EdgeInsets.fromLTRB(40.0, 30.0, 40.0, 20.0),
              height: 230.0,
              width: 260.0,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(25),
                color: Colors.teal[800],
              ),
              child: Padding(
                padding: const EdgeInsets.fromLTRB(5.0, 0.0, 5.0, 20.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Text(
                      "20",
                      style: TextStyle(
                        color: Colors.teal[50],
                        fontFamily: 'Jomhuria',
                        fontSize: 100,
                      ),
                    ),
                    Text(
                      "Prawn Count",
                      style: TextStyle(
                        height: -0.001,
                        color: Colors.teal[50],
                        fontFamily: 'Jomhuria',
                        fontSize: 60,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            GestureDetector(
              onTap: () {},
              child: Container(
                width: 200,
                height: 45,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(50),
                  color: Colors.teal[800],
                ),
                child: const Center(
                    child: Padding(
                      padding: EdgeInsets.fromLTRB(20.0, 0.0, 30.0, 0.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Icon(Icons.add,
                            size: 35,
                            color: Colors.white,),
                          Text(
                            'Add to Pond',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20.0,
                              fontFamily: 'Inder',
                            ),
                          ),
                        ],
                      ),
                    )
                ),
              ),
            ),
            SizedBox(
              height: 10.0,
            ),
            GestureDetector(
              onTap: () {},
              child: Container(
                width: 200,
                height: 45,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(50),
                  color: Colors.teal[600],
                ),
                child: const Center(
                    child: Padding(
                      padding: EdgeInsets.fromLTRB(15.0, 0.0, 15.0, 0.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Icon(Icons.camera_alt,
                            size: 35,
                            color: Colors.white,),
                          Text(
                            'Capture Again',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20.0,
                              fontFamily: 'Inder',
                            ),
                          ),
                        ],
                      ),
                    )
                ),
              ),
            ),
            const SizedBox(
              height: 10.0,
            ),
            GestureDetector(
              onTap: () {},
              child: Container(
                width: 200,
                height: 45,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(50),
                  color: Colors.teal[400],
                ),
                child: const Center(
                    child: Padding(
                      padding: EdgeInsets.fromLTRB(15.0, 0.0, 20.0, 0.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Icon(Icons.arrow_back,
                            size: 35,
                            color: Colors.white,),
                          Text(
                            'Back to Home',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20.0,
                              fontFamily: 'Inder',
                            ),
                          ),
                        ],
                      ),
                    )
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}