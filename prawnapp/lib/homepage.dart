
import 'package:flutter/services.dart';
import 'package:flutter/material.dart';
import 'prawn_larvae_count.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final FirebaseFirestore firestore = FirebaseFirestore.instance;

  List<PrawnLarvaeCount> _prawnLarvaeCount = <PrawnLarvaeCount>[];
  static const channel = MethodChannel('methodchannel.prawnapp');

  @override
  Widget build(BuildContext context) {
    return SizedBox();
  }
}