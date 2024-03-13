package com.capstonics.prawncounterapi.model;

import java.io.File;

public class Count {
    public String fileId;
    public int count;

    public Count(String fileId, int count) {
        this.fileId = fileId;
        this.count = count;
    }
}