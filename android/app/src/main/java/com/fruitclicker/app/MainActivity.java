package com.fruitclicker.app;

import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private TextView scoreText;
    private int score = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        scoreText = findViewById(R.id.score_text);
        Button clickButton = findViewById(R.id.click_button);

        clickButton.setOnClickListener(v -> {
            score++;
            scoreText.setText("Score: " + score);
        }
    }