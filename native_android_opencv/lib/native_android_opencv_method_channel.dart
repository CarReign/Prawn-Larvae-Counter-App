import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';

import 'native_android_opencv_platform_interface.dart';

/// An implementation of [NativeAndroidOpencvPlatform] that uses method channels.
class MethodChannelNativeAndroidOpencv extends NativeAndroidOpencvPlatform {
  /// The method channel used to interact with the native platform.
  @visibleForTesting
  final methodChannel = const MethodChannel('native_android_opencv');

  @override
  Future<String?> getPlatformVersion() async {
    final version = await methodChannel.invokeMethod<String>('getPlatformVersion');
    return version;
  }
}
