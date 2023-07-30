import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:chaquopy/chaquopy.dart';
import 'dart:typed_data';
import 'dart:io';

void main() {
  runApp(MyApp());
}

class

/*

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: TestHome(),
        routes: {
          ResultPage.routeName : (context) => ResultPage(),
        }
    );
  }
}

class ImageConverter {
  static Future<Uint8List> xFileToUInt8List(XFile? xFile) async{
    if(xFile == null) return Uint8List(0);
    final image = File(xFile.path);
    return await image.readAsBytes();
  }
}

class FetchedImage {
  XFile image;
  FetchedImage(this.image);
}

class PrawnCounter {
  /*
   * DO Chaquopy implementation here
   * ... run python code using uInt8list datatype
   * */
  int count(Uint8List image) {

    return 0;
  }
}

class TestHome extends StatelessWidget {

  static String routeName = '/testHome';

  Future<XFile?> getImage() async {
    try{
      return await ImagePicker().pickImage(source: ImageSource.camera);
    } catch (e) {
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: ElevatedButton(
          child: const Text("Start Scanning"),
          onPressed: () async {
            final image = await getImage();
            if(image == null) return;
            Navigator.pushNamed(context, ResultPage.routeName, arguments: FetchedImage(image));
          },
        )
      )
    );
  }
}

class ResultPage extends StatelessWidget {

  static String routeName = '/results';

  Future<int> count(XFile? pickedImage) async {
    final Uint8List imageIntList = await ImageConverter.xFileToUInt8List(pickedImage);
    final PrawnCounter prawnCounter = PrawnCounter();
    return prawnCounter.count(imageIntList);
  }

  @override
  Widget build(BuildContext context) {

    final fetchedImage = ModalRoute.of(context)!.settings.arguments as FetchedImage;
    final countedPrawn = count(fetchedImage.image);

    return Scaffold(
    body: Center(child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text("You have $countedPrawn prawns"),
        ElevatedButton(
          child: const Text("Back"),
          onPressed: () {
            Navigator.pop(context);
          },
        )
      ],
    ))
    );
  }
}

*/