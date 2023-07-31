import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:native_android_opencv/native_android_opencv_method_channel.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  MethodChannelNativeAndroidOpencv platform = MethodChannelNativeAndroidOpencv();
  const MethodChannel channel = MethodChannel('native_android_opencv');

  setUp(() {
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger.setMockMethodCallHandler(
      channel,
      (MethodCall methodCall) async {
        return '42';
      },
    );
  });

  tearDown(() {
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger.setMockMethodCallHandler(channel, null);
  });

  test('getPlatformVersion', () async {
    expect(await platform.getPlatformVersion(), '42');
  });
}
