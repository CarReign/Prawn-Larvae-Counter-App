import 'package:flutter/material.dart';


void main() => runApp(MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (context) => const WelcomePage(),
    '/signin': (context) => const SignInPage(),
    '/login': (context) => const LogInPage(),
    '/home': (context) => const HomePage(),
    '/results': (context) => const ResultsPage(),
    '/logs': (context) => const LogsPage(),
  },
));




class WelcomePage extends StatelessWidget {
  const WelcomePage({super.key});

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
            padding: const EdgeInsets.fromLTRB(30.0, 40.0, 30.0, 0),
            child: Image.asset("assets/app logo.png"),
          ),
          const SizedBox(height: 60.0),
          BigButton(
            text: 'Sign In',
            textColor: Colors.white,
            buttonColor: (Colors.teal[700])!,
            onTap: () {Navigator.pushNamed(context, '/signin');},),
          const SizedBox(height: 15.0),
          BigButton(
            text: 'Log In',
            textColor: (Colors.teal[700]!),
            buttonColor: Colors.white,
            onTap: () {Navigator.pushNamed(context, '/login');},
            borderColor: Border.all(
              width: 1.0,
              color: (Colors.teal[700]!),
            ),
          ),
          const SizedBox(height: 180.0),
          Container(
            margin: const EdgeInsets.fromLTRB(25.0, 0.0, 25.0, 5.0),
            child: const Column(
              children: <Widget>[
                Footer(
                    text: 'Copyright © 2024 Leonsarks'),
                Footer(
                    text: 'All Rights Reserved'),
              ],
            ),
          ),
        ],
      ),
    );
  }
}



class Footer extends StatelessWidget {
  final String text;

  const Footer({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: const TextStyle(
        color: Color(0xFF00796B),
        fontSize: 13.0,
        fontFamily: 'Inder',
      ),
    );
  }
}



//ignore: must_be_immutable
class BigButton extends StatelessWidget {
  final String text;
  final Color textColor;
  final Color buttonColor;
  final VoidCallback? onTap;
  BoxBorder? borderColor;


  BigButton({super.key,
    required this.text,
    required this.textColor,
    required this.buttonColor,
    required this.onTap,
    this.borderColor
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 300,
        height: 50,
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(50),
            color: buttonColor,
            border: borderColor
        ),
        child: Center(
            child: Text(text,
              style: TextStyle(
                color: textColor,
                fontSize: 22.0,
                fontFamily: 'inter',
              ),
            )
        ),
      ),
    );
  }
}


class SignInPage extends StatefulWidget {
  const SignInPage({Key? key}) : super(key: key);

  @override
  State<SignInPage> createState() => _SignInPage();
}

class _SignInPage extends State<SignInPage> {
  TextEditingController usernameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  static String signin_username = '';
  static String signin_password = '';
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
            AuthTextField(
                text: 'Username',
                controller: usernameController
            ),
            const SizedBox(height: 15.0),
            AuthTextField(
                text: 'Password',
                controller: passwordController
            ),
            const SizedBox(height: 25.0),
            BigButton(
              text: 'Sign In',
              textColor: Colors.white,
              buttonColor: (Colors.teal[700])!,
              onTap: () {
                Navigator.pushNamed(context, '/login');
                setState(() {
                  signin_username = usernameController.text;
                  signin_password = passwordController.text;
                });
              },
            ),
            const SizedBox(height: 12.0),
            AltOption(
                text: 'Already have an account?',
                textColor: (Colors.teal[300])!,
                textButtonText: 'Log In',
                textButtonColor: (Colors.teal[700])!,
                onPressed: () {Navigator.pushNamed(context, '/login');}),
            const SizedBox(height: 100.0),
            Container(
              margin: const EdgeInsets.fromLTRB(25.0, 0.0, 25.0, 5.0),
              child: const Column(
                children: [
                  Footer(
                      text: 'Copyright © 2024 Leonsarks'),
                  Footer(
                      text: 'All Rights Reserved'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}



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
            AuthTextField(
                text: 'Username',
                controller: usernameController
            ),
            const SizedBox(height: 15.0),
            AuthTextField(
                text: 'Password',
                controller: passwordController
            ),
            const SizedBox(height: 25.0),
            BigButton(
              text: 'Log In',
              textColor: Colors.white,
              buttonColor: (Colors.teal[700])!,
              onTap: () {
                Navigator.pushNamed(context, '/home');
                setState(() {
                  login_username = usernameController.text;
                  login_password = passwordController.text;
                });
              },
            ),
            const SizedBox(height: 12.0),
            AltOption(
                text: "Doesn't have an account yet?",
                textColor: (Colors.teal[300])!,
                textButtonText: 'Sign In',
                textButtonColor: (Colors.teal[700])!,
                onPressed: () {Navigator.pushNamed(context, '/signin');}),
            const SizedBox(height: 100.0),
            Container(
              margin: const EdgeInsets.fromLTRB(25.0, 0.0, 25.0, 25.0),
              child: const Column(
                children: [
                  Footer(
                      text: 'Copyright © 2024 Leonsarks'),
                  Footer(
                      text: 'All Rights Reserved'),
                ],
              ),
            ),

          ],
        ),
      ),
    );
  }
}


class AltOption extends StatelessWidget {
  final String text;
  final Color textColor;
  final String textButtonText;
  final Color textButtonColor;
  final VoidCallback onPressed;

  const AltOption({super.key,
    required this.text,
    required this.textColor,
    required this.textButtonText,
    required this.textButtonColor,
    required this.onPressed

  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          text,
          style: TextStyle(
            color: textColor,
            fontSize: 18.0,
          ),
        ),
        const SizedBox(height: 0.0),
        TextButton(
          onPressed: onPressed,
          child: Text(textButtonText,
            style: TextStyle(
              height: -0.6,
              color: textButtonColor,
              fontSize: 18.0,
              decoration: TextDecoration.underline,
            ),
          ),
        ),
      ],
    );
  }
}



class AuthTextField extends StatelessWidget {
  final String text;
  final TextEditingController controller;

  const AuthTextField({super.key, required this.text, required this.controller});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 300,
      height: 45,
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.all(Radius.circular(50)),
      ),
      child: TextField(
        controller: controller,
        decoration: InputDecoration(
          border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(50)
          ),
          labelText: text,
        ),
      ),
    );
  }
}



class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.teal[50],
      body: const Body(),
      floatingActionButton: const CameraButton(),
      floatingActionButtonLocation:
      FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: const BottomNavBar(),
    );
  }
}



class Body extends StatefulWidget {
  const Body({super.key});

  @override
  State<Body> createState() => _BodyState();
}

class _BodyState extends State<Body> {

  @override
  Widget build(BuildContext context) {

    //initializing it for now, this is where the username that we'll get from the database will be go uwu
    var username = '';

    return SafeArea(
      child: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20.0),
                color: Colors.teal[800],
              ),
              margin: const EdgeInsets.fromLTRB(25.0, 30.0, 25.0, 0),
              height: 100.0,
              padding: const EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
              child: Column(
                children: [
                  Center(
                    child: Text(
                      "Welcome $username,",
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
            const SizedBox(height: 15.0,),
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
              margin: const EdgeInsets.fromLTRB(25.0, 00.0, 25.0, 0),
              height: 80.0,
              padding: const EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
            ),
            const SizedBox(height: 20.0,),
            Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20.0),
                color: Colors.teal[800],
              ),
              margin: const EdgeInsets.fromLTRB(25.0, 00.0, 25.0, 0),
              height: 80.0,
              padding: const EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
            ),
            const SizedBox(height: 20.0),
            Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20.0),
                color: Colors.teal[100],
              ),
              margin: const EdgeInsets.fromLTRB(25.0, 00.0, 25.0, 0),
              height: 390.0,
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
                          padding: const EdgeInsets.fromLTRB(10.0, 0.0, 0.0, 8.0),
                          child: IconButton(onPressed: () {}, //getUsername function goes here
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
                  const Pond(),
                  const SizedBox(
                    height: 10.0,
                  ),
                  const Pond(),
                ],
              ),
            ),

            const SizedBox(
              height: 20.0,
            ),
          ],
        ),
      ),
    );
  }
}


class CameraButton extends StatelessWidget {
  const CameraButton({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 100.0,
      child: FittedBox(
        child: FloatingActionButton(
          elevation: 10.0,
          backgroundColor: Colors.teal[800],
          onPressed: () {Navigator.pushNamed(context, '/results');}, //getImage function goes here
          child: const SizedBox(
            child: Icon(Icons.camera_alt,
              size: 30.0,
            ),
          ),
        ),
      ),
    );
  }
}



class BottomNavBar extends StatelessWidget {
  const BottomNavBar({super.key});

  @override
  Widget build(BuildContext context) {
    return BottomAppBar(
      padding: EdgeInsets.symmetric(),
      height: 80.0,
      child: Container(
        child: Row(
          children: <Widget>[
            const SizedBox(
              width: 50,
            ),
            Container(
              padding: const EdgeInsets.fromLTRB(10.0, 5.0, 0.0, 20),
              child: IconButton(
                icon: Icon(Icons.home,
                    size: 52.0,
                    color: Colors.teal[800]
                ),
                onPressed: () {
                  Navigator.pushNamed(context, '/home');
                },
              ),
            ),
            const SizedBox(width: 180),
            Container(
              padding: const EdgeInsets.fromLTRB(0.0, 10.0, 0.0, 25.0),
              child: IconButton(
                icon: Icon(Icons.history,
                  size: 48.0,
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


class Pond extends StatefulWidget {
  const Pond({super.key});

  @override
  State<Pond> createState() => _PondState();
}

class _PondState extends State<Pond> {

  //initializing prawn_count variableee
  String prawn_count = '0';

  @override
  Widget build(BuildContext context) {

    TextEditingController prawnCountcontroller = TextEditingController();


    //function to pop the showDialog form when editCount button is pressed
    void editCount() {
      Navigator.of(context).pop(prawnCountcontroller.text);
    }

    //function for the edit prawn count form
    Future<String?> showForm() => showDialog<String>(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: const Text("Edit"),
            content: TextField(
              controller: prawnCountcontroller,
              decoration: InputDecoration(
                  hintText: prawn_count
              ),
            ),
            actions: [
              TextButton(
                  onPressed: () {
                    editCount();
                  },
                  child: const Text("Add Count"))
            ],
          );
        });

    return Column(
      children: <Widget>[
        Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20.0),
            color: Colors.teal[400],
          ),
          height: 80.0,
          padding: const EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              const Padding(
                padding: EdgeInsets.fromLTRB(0.0, 0, 10.0, 0),
                child: Text(
                  "#1",
                  style: TextStyle(
                    fontFamily: 'Jomhuria',
                    fontSize: 35.0,
                  ),
                ),
              ),
              const VerticalDivider(
                thickness: 1.0,
                color: Colors.teal,
              ),
              const SizedBox(
                width: 5.0,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Column(
                    children: <Widget>[
                      Text(prawn_count,
                        style: const TextStyle(
                          fontSize: 50.0,
                          fontFamily: 'Jomhuria',

                        ),
                      ),
                      const Text("Prawn Count",
                        style: TextStyle(
                          height: -0.1,
                        ),
                      )
                    ],
                  ),
                  const SizedBox(
                    width: 20.0,
                  ),
                  const Column(
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
                  onPressed: () async {
                    final prawnCount = await showForm();
                    if (prawnCount == null || prawnCount.isEmpty) return;
                    setState(() {
                      prawn_count = prawnCount;
                    });
                  },
                  child: Container(
                    color: Colors.teal[800],
                    margin: const EdgeInsets.fromLTRB(0, 0, 0, 0),
                    padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
                    child: const Text(
                      'Edit Count',
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
    );
  }
}



class ResultsPage extends StatefulWidget {
  const ResultsPage({super.key});


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
      body: SingleChildScrollView(
        child: Center(
          child: Column(
            children: <Widget>[
              Container(
                margin: const EdgeInsets.fromLTRB(40.0, 100.0, 40.0, 20.0),
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
              MediumButton(
                  onTap: () {}, //add to pond function goes here
                  icon: Icons.add,
                  text: 'Add to Pond  ',
                  color: (Colors.teal[800])!),
              const SizedBox(
                height: 10.0,
              ),
              MediumButton(
                  onTap: () {}, //getImage function goes here
                  icon: Icons.camera_alt,
                  text: 'Capture Again',
                  color: (Colors.teal[600])!),
              const SizedBox(
                height: 10.0,
              ),
              MediumButton(
                  onTap: () {Navigator.pushNamed(context, '/home');},
                  icon: Icons.arrow_back,
                  text: 'Back to Home',
                  color: (Colors.teal[400])!),
            ],
          ),
        ),
      ),
    );
  }
}


class MediumButton extends StatelessWidget {
  final VoidCallback onTap;
  final IconData icon;
  final String text;
  final Color color;

  const MediumButton({super.key,
    required this.onTap,
    required this.icon,
    required this.text,
    required this.color
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 220,
        height: 45,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(50),
          color: color,
        ),
        child: Center(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20.0, 0.0, 30.0, 0.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Icon(icon,
                    size: 35,
                    color: Colors.white,),
                  Text(
                    text,
                    style: const TextStyle(
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
    );
  }
}




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
      body: const Column(
        children: <Widget>[
          SizedBox(height: 10),
          Logs(),
          Logs(),
        ],
      ),
    );
  }
}


class Logs extends StatelessWidget {
  const Logs({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Row(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.fromLTRB(20.0, 10.0, 0.0, 0.0),
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
              padding: const EdgeInsets.fromLTRB(0.0, 10.0, 0.0, 0.0),
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
              padding: const EdgeInsets.fromLTRB(10.0, 10.0, 0.0, 0.0),
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
        const SizedBox(
          height: 10.0,
        ),
        Divider(
          thickness: 1.0,
          color: Colors.teal[100],
        ),
      ],
    );
  }
}


