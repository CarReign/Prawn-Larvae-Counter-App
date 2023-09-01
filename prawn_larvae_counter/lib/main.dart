import 'package:flutter/material.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const PrawnLarvaeCounterApp());
}

class PrawnLarvaeCounterApp extends StatefulWidget {
  const PrawnLarvaeCounterApp({Key? key}) : super(key: key);
  @override
  State<PrawnLarvaeCounterApp> createState() => _PrawnLarvaeCounterAppState();
}

class _PrawnLarvaeCounterAppState extends State<PrawnLarvaeCounterApp> {

  static const String defaultInitialIndexRoute = '/index';
  static const String gettingStartedPageRoute = '/gettingStarted';
  static const String homeLogPageRoute = '/home';
  static const String resultPageRoute = '/result';

  bool isInitialized(){
    return false;
  }

  @override
  Widget build(BuildContext context) {
    String initialHeader = defaultInitialIndexRoute;
    bool isInitialized = this.isInitialized();
    return MaterialApp(
      title: 'Prawn Larvae Counter',
      debugShowCheckedModeBanner: false,
      debugShowMaterialGrid: false,
      theme: ThemeData(
        primarySwatch: Colors.teal,
        fontFamily: 'Roboto',
        fontFamilyFallback: <String>['Roboto'],
        useMaterial3: true,
      ),
      initialRoute: initialHeader,
      routes: {
        defaultInitialIndexRoute: (context) => FrontPage(alreadyInitialized: isInitialized,),
        gettingStartedPageRoute: (context) => const GettingStartedPage(),
        homeLogPageRoute: (context) => const HomeLogPage(),
        resultPageRoute: (context) => const ResultPage(),
      },
    );
  }
}

  class FrontPage extends StatelessWidget {
    const FrontPage({Key? key, required this.alreadyInitialized}) : super(key: key);
    final bool alreadyInitialized;

    @override
    Widget build(BuildContext context) {

      return Scaffold(
        body: Center(
          child: Column(
            children: <Widget>[
              Expanded(child:
                  Center(child: Image.asset("assets/app logo.png")),
              ),
              Expanded(child:
                  Center(child:
                    alreadyInitialized ? FilledButton.tonal(
                      onPressed: () {
                        Navigator.pushReplacementNamed(context, '/home');
                      },
                      child: const Text('Continue'),
                    ) : FilledButton.tonal(
                      onPressed: () {
                        Navigator.pushReplacementNamed(context, '/gettingStarted');
                      },
                      child: Text('Get Started'),
                    )
                  )
              ),
              Text('Copyright 2024 Leonsarks'),
              Text('All Rights Reserved '),
              SizedBox(height: 30.0)
            ],
          )
        ),
      );
    }
  }

  class GettingStartedPage extends StatelessWidget {
    const GettingStartedPage({Key? key}) : super(key: key);

    @override
    Widget build(BuildContext context) {
      return const Scaffold();
    }
  }

  class HomeLogPage extends StatefulWidget {
    const HomeLogPage({Key? key}) : super(key: key);

    @override
    State<HomeLogPage> createState() => _HomeLogPageState();
  }

  class _HomeLogPageState extends State<HomeLogPage> {
    @override
    Widget build(BuildContext context) {
      return const Scaffold();
    }
  }

  class ResultPage extends StatefulWidget {
    const ResultPage({Key? key}) : super(key: key);

    @override
    State<ResultPage> createState() => _ResultPageState();
  }

  class _ResultPageState extends State<ResultPage> {
    @override
    Widget build(BuildContext context) {
      return const Scaffold();
    }
  }

    class PrawnCount {
      final int count;
      final DateTime date;

      PrawnCount({
        required this.count,
        required this.date,
      });

      // to map
      Map<String, dynamic> toMap() {
        return {
          'count': count,
          'date': date.toString(),
        };
      }

      @override
      String toString() {
        return 'PrawnCount{count: $count, date: $date}';
      }
    }

    class Farm {
      final String farmerName;
      final String farmName;

      Farm({
        required this.farmerName,
        required this.farmName,
      });

      Map<String, dynamic> toMap(){
        return {
          'farmerName': farmerName,
          'farmName': farmName,
        };
      }

      @override
      String toString(){
        return 'Farm{farmerName: $farmerName, farmName: $farmName}';
      }
    }
