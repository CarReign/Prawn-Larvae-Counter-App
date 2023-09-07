package com.jits.prawn_larvae_counter;

import androidx.annotation.NonNull;
import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;
import io.flutter.plugin.common.MethodChannel;

public class MainActivity extends FlutterActivity {
    private static final String CHANNEL = "jits.flutter.dev/opencvplugin";
    @Override
    public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
        super.configureFlutterEngine(flutterEngine);
            new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL).setMethodCallHandler(
                    (call, result) -> {
                        if(call.method.equals("debugOpenCV")){
                            result.success(debugOpenCV());
                        };

                        if(call.method.equals("blobDetection")){
                            int[] imageData = call.argument("imageData");
                        }
                    });
    }

    private String debugOpenCV(){
        return "nah";
    }
}
