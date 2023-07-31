import 'package:plugin_platform_interface/plugin_platform_interface.dart';

import 'native_android_opencv_method_channel.dart';

abstract class NativeAndroidOpencvPlatform extends PlatformInterface {
  /// Constructs a NativeAndroidOpencvPlatform.
  NativeAndroidOpencvPlatform() : super(token: _token);

  static final Object _token = Object();

  static NativeAndroidOpencvPlatform _instance = MethodChannelNativeAndroidOpencv();

  /// The default instance of [NativeAndroidOpencvPlatform] to use.
  ///
  /// Defaults to [MethodChannelNativeAndroidOpencv].
  static NativeAndroidOpencvPlatform get instance => _instance;

  /// Platform-specific implementations should set this with their own
  /// platform-specific class that extends [NativeAndroidOpencvPlatform] when
  /// they register themselves.
  static set instance(NativeAndroidOpencvPlatform instance) {
    PlatformInterface.verifyToken(instance, _token);
    _instance = instance;
  }

  Future<String?> getPlatformVersion() {
    throw UnimplementedError('platformVersion() has not been implemented.');
  }
}
