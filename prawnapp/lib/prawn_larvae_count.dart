//import uuid
import 'package:uuid/uuid.dart';

class PrawnLarvaeCount{
  final String id;
  final int count;
  final DateTime datetime;
  final String imagePath;

  const PrawnLarvaeCount(this.id, this.count, this.datetime, this.imagePath);

  PrawnLarvaeCount generate(int count, String imagePath) {
    return PrawnLarvaeCount(
      Uuid().v4(),
      count,
      DateTime.now(),
      imagePath,
    );
  }

  PrawnLarvaeCount parse(Map<String, dynamic> json) {
    return PrawnLarvaeCount(
      json['id'] as String,
      json['count'] as int,
      DateTime.parse(json['datetime'] as String),
      json['imagePath'] as String,
    );
  }

  Map<String, dynamic> _toMap() {
    return {
      'id': id,
      'count': count,
      'datetime': datetime.toIso8601String(),
      'imagePath': imagePath,
    };
  }

}
