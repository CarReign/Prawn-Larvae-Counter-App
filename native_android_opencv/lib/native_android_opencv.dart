
import 'native_android_opencv_platform_interface.dart';

class NativeAndroidOpencv {
  Future<String?> getPlatformVersion() {
    return NativeAndroidOpencvPlatform.instance.getPlatformVersion();
  }
}
