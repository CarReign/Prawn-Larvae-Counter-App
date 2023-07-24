import 'package:mysql1/mysql1.dart';
import 'dart:async';

class Mysql {
  static String host = '192.168.1.5',
                user = 'root',
                password = '',
                db = 'inventory_man_system';
  static int port = 3306;

  Mysql();

  Future<MySqlConnection> getConnection() async {
    var settings = new ConnectionSettings(
      host: host,
      port: port,
      user: user,
      password: password,
      db: db
    );
    return await MySqlConnection.connect(settings);
  }
}