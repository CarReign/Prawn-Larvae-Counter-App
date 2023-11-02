import 'dart:io';
import 'package:flutter/services.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:path_provider/path_provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const Demo(),
    );
  }
}

class Demo extends StatefulWidget {
  const Demo({super.key});

  @override
  State<Demo> createState() => _DemoState();
}

class _DemoState extends State<Demo> {
  int? _count = 0;
  File? _image;
  static const channel = MethodChannel('methodchannel.prawnapp');

  Future<void> getCameraImage() async {
    // get image from imagepicker
    XFile? image = await ImagePicker().pickImage(source: ImageSource.camera);
    await processImage(image);
  }

  Future<void> getGalleryImage() async {
    // get image from imagepicker
    XFile? image = await ImagePicker().pickImage(source: ImageSource.gallery);
    await processImage(image);
  }

  Future<void> processImage(XFile? image) async{
    final Directory appDir = await getApplicationDocumentsDirectory();
    final String path = '${appDir.path}/tmp.png';
    await image!.saveTo(path);
    int? count = await countBlobs(path);
    final File imageFile = File(path);
    setState(() {
      _image = imageFile;
      _count = count;
    });
  }

  Future<int?> countBlobs(imagePath) async {
    // count blobs in image
    print('countBlob called');
    try {
      final int count = await channel.invokeMethod('countBlobs', {'imagePath': imagePath});
      print('methodchannel returned $count');
      return count;
    } on PlatformException catch (e) {
      print(e.message);
    }
    return -1; // default
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text("Demo"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Row(
              children: <Widget>[
                ElevatedButton(onPressed: getCameraImage, child: const Icon(Icons.add_a_photo), // camera icon
                ),
                ElevatedButton(onPressed: getGalleryImage, child: const Icon(Icons.wallpaper))
              ]
            ),
            // display image
            const SizedBox(height: 20.0),
            SizedBox(width: MediaQuery.of(context).size.width, height: 200.0,
              child: _image == null ? const Text('No image selected.') : Image.file(_image!),
            ),
            const SizedBox(height: 20.0),
            const Text(
              'Previous Count:',
            ),
            Text(
              _count is int? '$_count' : '0',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ));
  }
}