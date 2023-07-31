import 'package:flutter_test/flutter_test.dart';
import 'package:native_android_opencv/native_android_opencv.dart';
import 'package:native_android_opencv/native_android_opencv_platform_interface.dart';
import 'package:native_android_opencv/native_android_opencv_method_channel.dart';
import 'package:plugin_platform_interface/plugin_platform_interface.dart';

class MockNativeAndroidOpencvPlatform
    with MockPlatformInterfaceMixin
    implements NativeAndroidOpencvPlatform {

  @override
  Future<String?> getPlatformVersion() => Future.value('42');
}

void main() {
  final NativeAndroidOpencvPlatform initialPlatform = NativeAndroidOpencvPlatform.instance;

  test('$MethodChannelNativeAndroidOpencv is the default instance', () {
    expect(initialPlatform, isInstanceOf<MethodChannelNativeAndroidOpencv>());
  });

  test('getPlatformVersion', () async {
    NativeAndroidOpencv nativeAndroidOpencvPlugin = NativeAndroidOpencv();
    MockNativeAndroidOpencvPlatform fakePlatform = MockNativeAndroidOpencvPlatform();
    NativeAndroidOpencvPlatform.instance = fakePlatform;

    expect(await nativeAndroidOpencvPlugin.getPlatformVersion(), '42');
  });
}
