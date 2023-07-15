import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:async';


class HomePage extends StatefulWidget {

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  File? _image;
  Future getImage() async {
    try{
      final image = await ImagePicker().pickImage(source: ImageSource.camera);
      if(image == null) return;
      final imagePermanent = await saveFilePermanently(image.path);
      setState(() {
        _image = imagePermanent;
      });
    } on PlatformException catch (e) {
      print("Failed to pick image: $e");
    }
  }

  Future<File> saveFilePermanently(String imagePath) async {
    final directory = await getApplicationDocumentsDirectory();
    final name = basename(imagePath);
    final image = File('${directory.path}/$name');

    return File(imagePath).copy(image.path);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      backgroundColor: Colors.teal[50],
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20.0),
                  color: Colors.teal[800],
                ),
                margin: const EdgeInsets.fromLTRB(40.0, 30.0, 40.0, 0),
                height: 100.0,
                padding: const EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
                child: Column(
                  children: [
                    Center(
                      child: Text(
                        "Welcome, Carren",
                        style: TextStyle(
                          color: Colors.teal[50],
                          fontSize: 60.0,
                          fontFamily: 'Jomhuria',
                        ),
                      ),
                    ),
                    const SizedBox(height: 10.0),
                    Center(
                      child: Text(
                        "RDEX Prawn Farm",
                        style: TextStyle(
                          height: -0.1,
                          color: Colors.teal[50],
                          fontSize: 40.0,
                          fontFamily: 'Jomhuria',
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 15.0,),
              Text(
                "Dashboard",
                style: TextStyle(
                  color: Colors.teal[800],
                  fontFamily: 'Jomhuria',
                  fontSize: 50.0,
                ),
              ),
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20.0),
                  color: Colors.teal[400],
                ),
                margin: const EdgeInsets.fromLTRB(40.0, 00.0, 40.0, 0),
                height: 80.0,
                padding: const EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
              ),
              SizedBox(height: 20.0,),
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20.0),
                  color: Colors.teal[800],
                ),
                margin: const EdgeInsets.fromLTRB(40.0, 00.0, 40.0, 0),
                height: 80.0,
                padding: const EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
              ),
              const SizedBox(height: 20.0),
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20.0),
                  color: Colors.teal[100],
                ),
                margin: const EdgeInsets.fromLTRB(40.0, 00.0, 40.0, 0),
                height: 800.0,
                padding: const EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 0.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          const Padding(
                            padding: EdgeInsets.fromLTRB(0.0, 10.0, 0, 0),
                            child: Text(
                              "Population of each Pond:",
                              style: TextStyle(
                                fontSize: 35.0,
                                fontFamily: 'Jomhuria',
                                color: Color(0xFF004D40),
                              ),
                            ),
                          ),
                          Container(
                            padding: EdgeInsets.fromLTRB(10.0, 0.0, 0.0, 8.0),
                            child: IconButton(onPressed: () {},
                                icon: Icon(Icons.add_circle,
                                  color: Colors.teal[800],
                                  size: 40.0,
                                ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Divider(
                      color: Colors.teal[600],
                      thickness: 1.0,
                    ),
                    const SizedBox(
                      height: 10.0,
                    ),

                    //Container of the whole pond details with buttons
                    Container(
                      child: Column(
                        children: <Widget>[
                          Container(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(20.0),
                              color: Colors.teal[400],
                            ),
                            margin: const EdgeInsets.fromLTRB(0.0, 00.0, 0.0, 0),
                            height: 80.0,
                            padding: const EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
                            child: const Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: <Widget>[
                                Padding(
                                  padding: EdgeInsets.fromLTRB(0.0, 0, 10.0, 0),
                                  child: Text(
                                    "#1",
                                    style: TextStyle(
                                      fontFamily: 'Jomhuria',
                                      fontSize: 35.0,
                                    ),
                                  ),
                                ),
                                VerticalDivider(
                                  thickness: 1.0,
                                  color: Colors.teal,
                                ),
                                SizedBox(
                                  width: 5.0,
                                ),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: <Widget>[
                                    Column(
                                      children: <Widget>[
                                        Text("20",
                                          style: TextStyle(
                                            fontSize: 50.0,
                                            fontFamily: 'Jomhuria',

                                          ),
                                        ),
                                        Text("Prawn Count",
                                          style: TextStyle(
                                            height: -0.1,
                                          ),
                                        )
                                      ],
                                    ),
                                    SizedBox(
                                      width: 20.0,
                                    ),
                                    Column(
                                      children: <Widget>[
                                        Text("1kg",
                                          style: TextStyle(
                                            fontSize: 50.0,
                                            fontFamily: 'Jomhuria',
                                          ),
                                        ),
                                        Text("Feeds Needed",
                                          style: TextStyle(
                                            height: -0.1,
                                          ),
                                        )
                                      ],
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: <Widget>[
                              Row(
                                children: <Widget>[
                                  TextButton(
                                    onPressed: () {},
                                    child: Container(
                                      color: Colors.teal[800],
                                      margin: const EdgeInsets.fromLTRB(0, 0, 0, 0),
                                      padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
                                      child: const Text(
                                        'Add Count',
                                        style: TextStyle(color: Colors.white, fontSize: 13.0),
                                      ),
                                    ),
                                  ),
                                  TextButton(
                                    onPressed: () {},
                                    child: Container(
                                      color: Colors.red,
                                      padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 15),
                                      child: const Text(
                                        'Delete',
                                        style: TextStyle(color: Colors.white, fontSize: 13.0),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          Divider(
                            height: 1.0,
                            color: Colors.teal[200],
                            thickness: 1.5,
                          ),
                          const SizedBox(
                            height: 10.0,
                          ),
                        ],
                      ),
                    ),
                    Container(
                      child: Column(
                        children: <Widget>[
                          Container(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(20.0),
                              color: Colors.teal[400],
                            ),
                            margin: const EdgeInsets.fromLTRB(0.0, 00.0, 0.0, 0),
                            height: 80.0,
                            padding: const EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
                            child: const Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: <Widget>[
                                Padding(
                                  padding: EdgeInsets.fromLTRB(0.0, 0, 10.0, 0),
                                  child: Text(
                                    "#2",
                                    style: TextStyle(
                                      fontFamily: 'Jomhuria',
                                      fontSize: 35.0,
                                    ),
                                  ),
                                ),
                                VerticalDivider(
                                  thickness: 1.0,
                                  color: Colors.teal,
                                ),
                                SizedBox(
                                  width: 5.0,
                                ),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: <Widget>[
                                    Column(
                                      children: <Widget>[
                                        Text("4000",
                                          style: TextStyle(
                                            fontSize: 50.0,
                                            fontFamily: 'Jomhuria',
                                          ),
                                        ),
                                        Text("Prawn Count",
                                          style: TextStyle(
                                            height: -0.1,
                                          ),
                                        )
                                      ],
                                    ),
                                    SizedBox(
                                      width: 20.0,
                                    ),
                                    Column(
                                      children: <Widget>[
                                        Text("200kg",
                                          style: TextStyle(
                                            fontSize: 50.0,
                                            fontFamily: 'Jomhuria',
                                          ),
                                        ),
                                        Text("Feeds Needed",
                                          style: TextStyle(
                                            height: -0.1,
                                          ),
                                        )
                                      ],
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: <Widget>[
                              Row(
                                children: <Widget>[
                                  TextButton(
                                    onPressed: () {},
                                    child: Container(
                                      color: Colors.teal[800],
                                      margin: const EdgeInsets.fromLTRB(0, 0, 0, 0),
                                      padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
                                      child: const Text(
                                        'Add Count',
                                        style: TextStyle(color: Colors.white, fontSize: 13.0),
                                      ),
                                    ),
                                  ),
                                  TextButton(
                                    onPressed: () {},
                                    child: Container(
                                      color: Colors.red,
                                      padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 15),
                                      child: const Text(
                                        'Delete',
                                        style: TextStyle(color: Colors.white, fontSize: 13.0),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          Divider(
                            height: 1.0,
                            color: Colors.teal[200],
                            thickness: 1.5,
                          ),
                          const SizedBox(
                            height: 10.0,
                          ),
                        ],
                      ),
                    ),
                    _image != null
                    ? Image.file(_image!,
                    width: 250,
                    height: 250,
                    fit: BoxFit.cover) : Text("E show sa nako diri ang image para makita jud na gi store sya sa _image variable, tho balak nako na himoon syang global na variable or what para ma access sya sa results page and didto sya e preview ang image"),
                    const SizedBox(
                      height: 10.0,
                    ),
                  ],
                ),
              ),
              const SizedBox(
                height: 20.0,
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: Container(
        height: 100.0,
        child: FittedBox(
          child: FloatingActionButton(
            elevation: 10.0,
            backgroundColor: Colors.teal[800],
            onPressed: getImage,
            child: Container(
              height: 200.0,
              width: 200.0,
              child: const Icon(Icons.camera_alt,
                size: 30.0,
              ),
            ),
          ),
        ),
      ),
      floatingActionButtonLocation:
      FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: BottomAppBar(
        height: 60.0,
        child: Row(

          children: <Widget>[
            Container(
              padding: EdgeInsets.fromLTRB(50.0, 0, 60.0, 30.0),
              child: IconButton(
                icon: Icon(Icons.home,
                    size: 50.0,
                    color: Colors.teal[800]
                ),
                onPressed: () {
                  Navigator.pushNamed(context, '/home');
                },
              ),
            ),
            Container(
              padding: EdgeInsets.fromLTRB(140.0, 5.0, 50.0, 25.0),
              child: IconButton(
                icon: Icon(Icons.history,
                  size: 40.0,
                  color: Colors.teal[800],
                ),
                onPressed: () {
                  Navigator.pushNamed(context, '/logs');
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
