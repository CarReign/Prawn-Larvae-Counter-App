import 'package:flutter/material.dart';
import 'package:prawn_larvae_counter/pages/welcome_page.dart';
import 'package:prawn_larvae_counter/pages/signin_page.dart';
import 'package:prawn_larvae_counter/pages/login_page.dart';
import 'package:prawn_larvae_counter/pages/home_page.dart';
import 'package:prawn_larvae_counter/pages/results_page.dart';
import 'package:prawn_larvae_counter/pages/logs_page.dart';

void main() => runApp(MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (context) => WelcomePage(),
    '/signin': (context) => const SignInPage(),
    '/login': (context) => const LogInPage(),
    '/home': (context) => HomePage(),
    '/results': (context) => ResultsPage(),
    '/logs': (context) => const LogsPage(),
  },
));




